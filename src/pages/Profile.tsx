import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import ToolCard from "@/components/ToolCard";
import { User, Shield, Calendar, Settings, LogOut, Heart, Plus } from "lucide-react";
import type { Tool } from "@/data/tools";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";


const Profile = () => {
  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    bio: "",
    organization: "",
    role: "",
    joinDate: "",
    avatarUrl: ""
  });
  const [wishlistTools, setWishlistTools] = useState<Tool[]>([]);
  const [userTools, setUserTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Hooks
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    if (user) {
      Promise.all([
        fetchUserProfile(),
        fetchUserTools(),
        fetchWishlistTools()
      ]).finally(() => setLoading(false));
    }
  }, [user]);

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      if (!profileData) {
        const newProfile = {
          id: user.id,
          full_name: user.user_metadata?.full_name || "",
          email: user.email || "",
          bio: "",
          organization: "",
          role: "",
          avatar_url: "",
          created_at: new Date().toISOString()
        };

        const { error: insertError } = await supabase
          .from("profiles")
          .insert(newProfile);

        if (insertError) throw insertError;

        setProfile({
          fullName: newProfile.full_name,
          email: newProfile.email,
          bio: newProfile.bio,
          organization: newProfile.organization,
          role: newProfile.role,
          joinDate: newProfile.created_at,
          avatarUrl: newProfile.avatar_url
        });
      } else {
        setProfile({
          fullName: profileData.full_name || "",
          email: profileData.email || user.email || "",
          bio: profileData.bio || "",
          organization: profileData.organization || "",
          role: profileData.role || "",
          joinDate: profileData.created_at || user.created_at || "",
          avatarUrl: profileData.avatar_url || ""
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    }
  };

  // Fetch tools submitted by user
  const fetchUserTools = async () => {
    try {
      const { data, error } = await supabase
        .from("tools")
        .select("*")
        .eq("submitted_by", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUserTools(data as Tool[]);
    } catch (error) {
      console.error("Error fetching user tools:", error);
      toast({
        title: "Error",
        description: "Failed to load your tools",
        variant: "destructive"
      });
    }
  };

  // Fetch wishlisted tools
  const fetchWishlistTools = async () => {
    try {
      const { data, error } = await supabase
        .from("wishlist")
        .select("tool:tool_id(*)")
        .eq("user_id", user.id);

      if (error) throw error;

      const tools = data.map((item: any) => item.tool).filter(Boolean);
      setWishlistTools(tools as Tool[]);
    } catch (error) {
      console.error("Error fetching wishlist tools:", error);
      toast({
        title: "Error",
        description: "Failed to load wishlist",
        variant: "destructive"
      });
    }
  };

  // Handle avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Save profile changes
  const handleSave = async () => {
    try {
      let avatarUrl = profile.avatarUrl;

      // Upload new avatar if selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        avatarUrl = publicUrl;
      }

      // Update profile data
      const updates = {
        full_name: profile.fullName || null,
        email: profile.email || null,
        bio: profile.bio || null,
        organization: profile.organization || null,
        role: profile.role || null,
        avatar_url: avatarUrl || null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          ...updates,
          created_at: profile.joinDate || new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditing(false);
      await fetchUserProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
        variant: "destructive"
      });
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error.message || "Could not sign out",
        variant: "destructive"
      });
    }
  };

  // Loading state
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-64 bg-muted rounded-lg"></div>
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarPreview || profile.avatarUrl || "/placeholder-avatar.jpg"} />
                  <AvatarFallback className="text-lg">
                    {profile.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{profile.fullName}</h1>
                  <p className="text-muted-foreground">{profile.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">Premium Member</Badge>
                    <Badge variant="outline">Verified</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column - Profile Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="cursor-pointer"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={profile.organization}
                  onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              {isEditing ? (
                <div className="flex gap-2">
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setAvatarPreview("");
                      setAvatarFile(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Right Column - Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist ({wishlistTools.length})</TabsTrigger>
              <TabsTrigger value="tools">My Tools ({userTools.length})</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {profile.bio || "No bio provided"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Account Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Member Since</span>
                    <span className="text-sm text-muted-foreground">
                      {profile.joinDate ? new Date(profile.joinDate).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Email</span>
                    <span className="text-sm text-muted-foreground">
                      {profile.email}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab - Corrected Section */}
            <TabsContent value="wishlist" className="space-y-6">
              {wishlistTools.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No tools in wishlist</h3>
                    <p className="text-muted-foreground">
                      Start adding tools to your wishlist to keep track of your favorites.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex-wrap">
                  {wishlistTools.map((tool) => (
                    <ErrorBoundary
                      key={tool.id}
                      fallback={<div className="border p-4 rounded-lg">Failed to load tool</div>}
                    >
                      <ToolCard
                        tool={tool}
                        isWishlisted={true}
                        onWishlistChange={fetchWishlistTools}
                      />
                    </ErrorBoundary>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* My Tools Tab */}
            <TabsContent value="tools" className="space-y-6">
              {userTools.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No tools submitted</h3>
                    <p className="text-muted-foreground">
                      Share your favorite cybersecurity tools with the community.
                    </p>
                    <Button className="mt-4" onClick={() => navigate("/submit-tool")}>
                      Submit Your First Tool
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {userTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="stats" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Activity Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Member Since</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {profile.joinDate ? new Date(profile.joinDate).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tools Submitted</span>
                    <span className="text-sm font-bold">{userTools.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Wishlist Items</span>
                    <span className="text-sm font-bold">{wishlistTools.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Votes Received</span>
                    <span className="text-sm font-bold">
                      {userTools.reduce((sum, tool) => sum + (tool.votes || 0), 0)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;