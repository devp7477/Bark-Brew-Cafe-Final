import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignIn, SignUp, useAuth, useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      navigate("/");
    }
  }, [isSignedIn, isLoaded, user, navigate]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">🐾</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Bark & Brew</h1>
          <p className="text-gray-600">Café & Pet Care</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {mode === "login" ? "Welcome Back" : "Join Our Pet Community"}
            </CardTitle>
            <CardDescription>
              {mode === "login" 
                ? "Sign in to your account to continue" 
                : "Create your pet owner account to book services"
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={mode} onValueChange={(value) => setMode(value as "login" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value={mode}>
                {mode === "login" ? (
                  <SignIn 
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
                        card: "shadow-none",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border-gray-300 hover:bg-gray-50",
                        formFieldInput: "border-gray-300 focus:border-orange-500 focus:ring-orange-500",
                        footerActionLink: "text-orange-600 hover:text-orange-700",
                      }
                    }}
                    redirectUrl="/"
                    afterSignInUrl="/"
                  />
                ) : (
                  <SignUp 
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
                        card: "shadow-none",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border-gray-300 hover:bg-gray-50",
                        formFieldInput: "border-gray-300 focus:border-orange-500 focus:ring-orange-500",
                        footerActionLink: "text-orange-600 hover:text-orange-700",
                      }
                    }}
                    redirectUrl="/"
                    afterSignUpUrl="/"
                  />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;