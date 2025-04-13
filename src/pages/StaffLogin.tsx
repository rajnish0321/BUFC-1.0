
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, LockKeyhole, Mail } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/components/ui/use-toast';

const StaffLogin = () => {
  const { toast } = useToast();
  const { signIn, signUp } = useUser();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    staffId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Error",
          description: "Passwords do not match.",
          variant: "destructive"
        });
        return;
      }
      
      if (isLogin) {
        // Login
        await signIn(formData.email, formData.password);
        navigate('/dashboard');
      } else {
        // Signup
        await signUp(formData.email, formData.password, {
          staffId: formData.staffId,
          role: 'staff'
        });
        // Stay on the page after signup to allow user to login
        setIsLogin(true);
        toast({
          title: "Verification Email Sent",
          description: "Please check your email to verify your account before logging in.",
        });
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-bufc-gray px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="bg-bufc-blue text-white font-bold rounded-md p-1">
              BUFC
            </div>
            <span className="font-bold text-bufc-blue">
              Staff Portal
            </span>
          </Link>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 bg-bufc-blue/10 rounded-full flex items-center justify-center">
                <Utensils size={32} className="text-bufc-blue" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {isLogin ? 'Staff Login' : 'Staff Signup'}
            </CardTitle>
            <p className="text-center text-sm text-gray-500">
              {isLogin 
                ? 'Enter your credentials to access the staff dashboard' 
                : 'Create your staff account to get started'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Staff ID Field - Only for Signup */}
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="staffId" className="text-sm font-medium">
                    Staff ID
                  </label>
                  <Input
                    id="staffId"
                    placeholder="Enter your staff ID"
                    type="text"
                    value={formData.staffId}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  {isLogin && (
                    <button type="button" className="text-xs text-bufc-blue hover:underline">
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <LockKeyhole className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              {/* Confirm Password Field - Only for Signup */}
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <LockKeyhole className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              )}
              
              <Button type="submit" className="w-full bg-bufc-blue hover:bg-bufc-blue/90 text-white" disabled={loading}>
                {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-gray-500">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-bufc-blue hover:underline font-medium"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-500 mt-4">
                <Link to="/login" className="text-bufc-blue hover:underline">
                  Back to login options
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Having trouble logging in? Contact IT support at support@bennett.edu.in</p>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
