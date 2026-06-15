'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = '비회원' | '회원' | '협력사' | '관리자';

interface AuthContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // 기본값은 '관리자'로 하여 테스트가 쉽도록 하거나 '비회원'으로 합니다.
  // 요구사항에서 버튼을 통해 바꾼다고 했으므로, '비회원'을 기본으로 둡니다.
  const [role, setRole] = useState<Role>('비회원');

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
