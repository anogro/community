'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth, Role } from '@/context/AuthContext';
import styles from './Header.module.css';
import { UserCircle } from 'lucide-react';

export default function Header() {
  const { role, setRole } = useAuth();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as Role);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          ANOGRO
        </Link>
        <div className={styles.controls}>
          <UserCircle size={20} color="var(--color-text-muted)" />
          <select value={role} onChange={handleRoleChange} className={styles.select}>
            <option value="비회원">비회원 (테스트)</option>
            <option value="회원">회원 (테스트)</option>
            <option value="협력사">협력사 (테스트)</option>
            <option value="관리자">관리자 (테스트)</option>
          </select>
        </div>
      </div>
    </header>
  );
}
