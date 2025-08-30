import { useState, useEffect, useRef } from "react";
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
import { v4 as uuidv4 } from 'uuid';
import {
  User,
  Shield,
  Calendar,
  Settings,
  LogOut,
  Heart,
  Plus,
  ArrowUp,
  Github,
  LinkedinIcon,
} from "lucide-react"; 
import { fetchVotingHistory, VoteHistory, type Tool } from "@/data/tools";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import CoinsIcon from '../../src/coinsicon.svg';

const Profile = () => {
  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    bio: "",
    organization: "",
    joinDate: "",
    avatarUrl: "",
    linkedin: "",
    github: "",
    instagram: "",
    cyberPoints: 0,
  });
  const [wishlistTools, setWishlistTools] = useState<Tool[]>([]);
  const [userTools, setUserTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [votingHistory, setVotingHistory] = useState<VoteHistory[]>([]);

  // Hooks
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Fetch data on mount
  useEffect(() => {
    if (user) {
      Promise.all([
        fetchUserProfile(),
        fetchUserTools(),
        fetchWishlistTools(),
        fetchVotingHistory(user.id),
      ]).finally(() => setLoading(false));
    }
  }, [user]);

  

  // Fetch user profile including social links and cyberPoints
  const fetchUserProfile = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select(
          "full_name, email, bio, organization, avatar_url, linkedin, github, instagram, cyber_points, created_at"
        )
        .eq("id", user.id)
        .single();
      if (profileError) throw profileError;

      let avatarUrl = "";
      if (profileData?.avatar_url) {
        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(profileData.avatar_url);
        avatarUrl = data?.publicUrl || "";
      }

      setProfile({
        fullName: profileData.full_name || "",
        email: profileData.email || user.email || "",
        bio: profileData.bio || "",
        organization: profileData.organization || "",
        joinDate: profileData.created_at || "",
        avatarUrl: avatarUrl,
        linkedin: profileData.linkedin || "",
        github: profileData.github || "",
        instagram: profileData.instagram || "",
        cyberPoints: profileData.cyber_points || 0,
      });
      
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    }
  };

  // Fetch user tools submitted
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
        variant: "destructive",
      });
    }
  };

  // Fetch wishlist tools
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
        variant: "destructive",
      });
    }
  };

  // Avatar file change handler
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const fetchVotingHistory = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("tool_votes")
        .select(
          `tool_id, vote_type, created_at, comment, tools!tool_votes_tool_id_fkey(name, category, type)`
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;

      const processedData = data.map((vote) => ({
        tool_id: vote.tool_id,
        tool_name: vote.tools?.name,
        tool_category: vote.tools?.category,
        tool_type: vote.tools?.type || "",
        vote_type: vote.vote_type,
        created_at: vote.created_at,
        comment: vote.comment || undefined,
      }));

      setVotingHistory(processedData);
    } catch (error) {
      console.error("Error loading voting history:", error);
      toast({
        title: "Error",
        description: "Failed to load voting history",
        variant: "destructive",
      });
    }
  };


  const handleSave = async () => {
    try {
      let avatarFilePath = profile.avatarUrl; // This holds a relative path, e.g. 'avatars/xyz.png'

      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}-${uuidv4()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        if (profile.avatarUrl && profile.avatarUrl !== filePath) {
          await supabase.storage.from('avatars').remove([profile.avatarUrl]);
        }

        // Upload the file to Supabase storage bucket 'avatars'
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile);

        if (uploadError) throw uploadError;

        // Save only the **relative file path** in your profile
        avatarFilePath = filePath;
      }

      const updates = {
        full_name: profile.fullName || null,
        email: profile.email || null,
        bio: profile.bio || null,
        organization: profile.organization || null,
        linkedin: profile.linkedin || null,
        github: profile.github || null,
        instagram: profile.instagram || null,
        avatar_url: avatarFilePath || null, // Relative path only saved here
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates,
          created_at: profile.joinDate || new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });

      setIsEditing(false);
      await new Promise((resolve) => setTimeout(resolve, 500)); // 500 ms delay
      await fetchUserProfile();

    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile.',
        variant: 'destructive',
      });
    }
  };


  const usernameRegex = /^[a-zA-Z0-9_.]{3,30}$/;

 const onLinkedInChange = (e: { target: { value: any; }; }) => {
  const val = e.target.value;
  if (val === "" || /^[a-zA-Z0-9_\.~-]*$/.test(val)) {
    setProfile({ ...profile, linkedin: val });
  }
};

 const onGithubChange = (e: { target: { value: any; }; }) => {
  const val = e.target.value;
  if (val === "" || /^[a-zA-Z0-9_\.~-]*$/.test(val)) {
    setProfile({ ...profile, github: val });
  }
};

 const onInstagramChange = (e: { target: { value: any; }; }) => {
   const val = e.target.value;
   if (val === "" || /^[a-zA-Z0-9_\.~-]*$/.test(val)) {
     setProfile({ ...profile, instagram: val });
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
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message || "Could not sign out",
        variant: "destructive",
      });
    }
  };

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
                  <AvatarImage className="h-20 w-20 rounded-lg object-cover"
                    src={avatarPreview || profile.avatarUrl || "/placeholder-avatar.jpg"}
                  />
                  <AvatarFallback className="text-lg">
                    {profile.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{profile.fullName}</h1>
                  {/* CyberCoins display */}
                  <div className="flex items-center space-x-2 mt-2">
                    <img src={CoinsIcon} alt="Coins Icon" className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold text-lg">{profile.cyberPoints} CyberCoin</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">Premium Member</Badge>
                    <Badge variant="outline">Verified</Badge>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-4">
                {/* Social Media Icons with links */}
                {profile.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${profile.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    className="hover:text-blue-600"
                  >
                    <LinkedinIcon className="h-6 w-6" />
                  </a>
                )}
                {profile.github && (
                  <a
                    href={`https://github.com/${profile.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    className="hover:text-gray-700"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                )}
                {profile.instagram && (
                  <a
                    href={`https://instagram.com/${profile.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="hover:text-pink-600"
                  >
                    {/* Instagram svg or icon */}
                    <svg
                      className="h-6 w-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zm4.25 2.75a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm4.75-.25a.75.75 0 110 1.5.75.75 0 010-1.5z" />
                    </svg>
                  </a>
                )}
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                  style={{ transform: 'translateY(-6px)' }}
                >
                  <LogOut className="h-4 w-4" /> Sign Out
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
                <User className="h-5 w-5" /> Profile Information
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

              {/* Social Media Links Inputs */}
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  type="text"
                  placeholder="e.g. johnsmith"
                  value={profile.linkedin}
                  onChange={onLinkedInChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  type="text"
                  placeholder="e.g. johnsmith"
                  value={profile.github}
                  onChange={onGithubChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  type="text"
                  placeholder="e.g. yourhandle"
                  value={profile.instagram}
                  onChange={onInstagramChange}
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
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist ({wishlistTools.length})</TabsTrigger>
              <TabsTrigger value="tools">My Tools ({userTools.length})</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="votes">Votes ({votingHistory.length})</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" /> About
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
                    <Shield className="h-5 w-5" /> Account Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Member Since</span>
                    <span className="text-sm text-muted-foreground">
                      {profile.joinDate
                        ? new Date(profile.joinDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Email</span>
                    <span className="text-sm text-muted-foreground">{profile.email}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="space-y-6">
              {wishlistTools.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No tools in wishlist</h3>
                    <p className="text-muted-foreground">
                      Start adding tools to your wishlist to keep track of your
                      favorites.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex-wrap">
                  {wishlistTools.map((tool) => (
                    <ErrorBoundary
                      key={tool.id}
                      fallback={
                        <div className="border p-4 rounded-lg">
                          Failed to load tool
                        </div>
                      }
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
                    <Button
                      className="mt-4"
                      onClick={() => navigate("/submit-tool")}
                    >
                      Submit Your First Tool
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex-wrap">
                  {userTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="stats" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" /> Activity Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Member Since</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {profile.joinDate
                          ? new Date(profile.joinDate).toLocaleDateString()
                          : "N/A"}
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

            {/* Votes Tab */}
            <TabsContent value="votes" className="space-y-6">
              {votingHistory.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <ArrowUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No voting history</h3>
                    <p className="text-muted-foreground">
                      Your votes on tools will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {votingHistory.map((vote) => {
                    const voteDate = new Date(vote.created_at);
                    const isValidDate = !isNaN(voteDate.getTime());
                    return (
                      <Card key={`${vote.tool_id}-${vote.created_at}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">
                                {vote.tool_name || "Unnamed Tool"}
                              </h3>
                              {(vote.tool_category || vote.tool_type) && (
                                <div className="flex gap-2 mt-1 flex-wrap ">
                                  {vote.tool_category && (
                                    <Badge
                                      variant="secondary"
                                      className="truncate max-w-[120px] text-[9px]"
                                    >
                                      {vote.tool_category}
                                    </Badge>
                                  )}
                                  {vote.tool_type && (
                                    <Badge
                                      variant="outline"
                                      className="truncate max-w-[120px] "
                                    >
                                      {vote.tool_type}
                                    </Badge>
                                  )}
                                </div>
                              )}
                              {vote.comment && (
                                <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">
                                  "{vote.comment}"
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col items-end shrink-0">
                              <Badge
                                variant={vote.vote_type === "upvote" ? "default" : "destructive"}
                                className="mb-2"
                              >
                                {vote.vote_type === "upvote" ? "Upvoted" : "Downvoted"}
                              </Badge>
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {isValidDate ? voteDate.toLocaleDateString() : "Unknown date"}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
