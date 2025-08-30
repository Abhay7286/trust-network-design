import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { sendApprovalEmail } from "@/hooks/sendApprovalEmail";

const ToolSubmissions = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("tool_submissions")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true });
      if (error) throw error;
      setSubmissions(data || []);
    } catch (err: any) {
      toast({
        title: "Error fetching submissions",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const approveSubmission = async (id: string) => {
    setLoading(true);
    try {
      const { data: submission, error: fetchError } = await supabase
        .from("tool_submissions")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError || !submission)
        throw fetchError || new Error("Submission not found");

      if (!submission.submitter_email) {
        toast({
          title: "Missing submitter email",
          description: "Cannot send approval email. Submitter email is missing.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from("tools").insert([
        {
          name: submission.name,
          description: submission.description,
          website: submission.website,
          github: submission.github,
          category: submission.category,
          type: submission.type,
          tags: submission.tags,
          submitted_by: submission.submitted_by,
          created_at: new Date().toISOString(),
        },
      ]);
      if (insertError) throw insertError;

      const { error: updateError } = await supabase
        .from("tool_submissions")
        .update({ status: "approved", updated_at: new Date().toISOString() })
        .eq("id", id);
      if (updateError) throw updateError;

      await sendApprovalEmail(
        submission.submitter_email,
        submission.name,
        submission.submitter_name
      );

      toast({
        title: "Submission approved",
        description:
          "The tool submission has been approved, the submitter has been notified.",
      });
      await fetchSubmissions();
    } catch (error: any) {
      toast({
        title: "Error approving submission",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Admin: Tool Submissions</h1>
      {loading && <p>Loading submissions...</p>}
      {!loading && submissions.length === 0 && <p>No pending submissions at the moment.</p>}
      <div className="space-y-6">
        {submissions.map((sub) => (
          <Card key={sub.id}>
            <CardHeader>
              <CardTitle>{sub.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Description:</strong> {sub.description}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={sub.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {sub.website}
                </a>
              </p>
              {sub.github && (
                <p>
                  <strong>GitHub:</strong>{" "}
                  <a
                    href={sub.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    {sub.github}
                  </a>
                </p>
              )}
              <p>
                <strong>Category:</strong> {sub.category}
              </p>
              <p>
                <strong>Type:</strong> {sub.type}
              </p>
              <p>
                <strong>Tags:</strong>{" "}
                {Array.isArray(sub.tags) ? sub.tags.join(", ") : "N/A"}
              </p>
              <p>
                <strong>Submitter name:</strong> {sub.submitter_name || "N/A"}
              </p>
              <p>
                <strong>Submitter email:</strong> {sub.submitter_email || "N/A"}
              </p>
              <Button
                onClick={() => approveSubmission(sub.id)}
                className="mt-4"
                disabled={loading}
              >
                Approve Submission
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ToolSubmissions;
