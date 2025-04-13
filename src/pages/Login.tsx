
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, BookOpen, User } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate('/student-login');
  };

  const handleStaffLogin = () => {
    navigate('/staff-login');
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
              Bennett University Food Courtyard
            </span>
          </Link>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 bg-bufc-blue/10 rounded-full flex items-center justify-center">
                <User size={32} className="text-bufc-blue" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Login to BUFC
            </CardTitle>
            <p className="text-center text-sm text-gray-500">
              Choose your account type to continue
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button 
                onClick={handleStudentLogin} 
                variant="outline" 
                className="w-full h-16 flex items-center justify-start px-6 hover:bg-bufc-lightblue hover:border-bufc-blue transition-all"
              >
                <div className="bg-bufc-blue/10 p-2 rounded-full mr-4">
                  <BookOpen size={24} className="text-bufc-blue" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Student Login</div>
                  <div className="text-sm text-gray-500">For Bennett University students</div>
                </div>
              </Button>
              
              <Button 
                onClick={handleStaffLogin} 
                variant="outline" 
                className="w-full h-16 flex items-center justify-start px-6 hover:bg-bufc-lightblue hover:border-bufc-blue transition-all"
              >
                <div className="bg-bufc-blue/10 p-2 rounded-full mr-4">
                  <Utensils size={24} className="text-bufc-blue" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Staff Login</div>
                  <div className="text-sm text-gray-500">For BUFC staff members</div>
                </div>
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-6">
              <Link to="/" className="text-bufc-blue hover:underline">
                Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Having trouble logging in? Contact support at support@bennett.edu.in</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
