import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface VerificationState {
  isVerified: boolean;
  isLoading: boolean;
  needsVerification: boolean;
}

export function useUserVerification(user: User | null) {
  const [verificationState, setVerificationState] = useState<VerificationState>({
    isVerified: false,
    isLoading: true,
    needsVerification: false,
  });

  useEffect(() => {
    if (!user) {
      setVerificationState({
        isVerified: false,
        isLoading: false,
        needsVerification: false,
      });
      return;
    }

    // Check if user email is confirmed
    const isEmailConfirmed = user.email_confirmed_at !== null;
    
    setVerificationState({
      isVerified: isEmailConfirmed,
      isLoading: false,
      needsVerification: !isEmailConfirmed,
    });
  }, [user]);

  const sendVerificationEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
        }
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const verifyEmail = async (email: string, token: string) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email'
      });
      
      if (!error && data?.user) {
        setVerificationState(prev => ({
          ...prev,
          isVerified: true,
          needsVerification: false,
        }));
      }
      
      return { error };
    } catch (error) {
      return { error };
    }
  };

  return {
    ...verificationState,
    sendVerificationEmail,
    verifyEmail,
  };
}