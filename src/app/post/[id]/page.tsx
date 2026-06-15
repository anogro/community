'use client';

import React, { use } from 'react';
import { useAuth, Role } from '@/context/AuthContext';
import { DUMMY_POSTS } from '@/app/page';
import styles from './post.module.css';
import Badge from '@/components/common/Badge';
import { Lock } from 'lucide-react';
import Link from 'next/link';

const roleLevels: Record<Role, number> = {
  '비회원': 0,
  '회원': 1,
  '협력사': 2,
  '관리자': 3
};

export default function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { role } = useAuth();
  
  const post = DUMMY_POSTS.find(p => p.id === resolvedParams.id);
  
  if (!post) {
    return <div className={styles.container}>게시글을 찾을 수 없습니다.</div>;
  }

  const hasPermission = roleLevels[role] >= roleLevels[post.minRole];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.meta}>
          <Badge variant="outline">{post.category}</Badge>
          <span className={styles.date}>{post.date}</span>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
      </header>

      <div className={styles.imageContainer}>
        <img src={post.thumbnail} alt={post.title} className={styles.image} />
      </div>

      {!hasPermission ? (
        <div className={styles.noPermissionModal}>
          <Lock size={48} color="var(--color-primary-orange)" />
          <h2>권한이 없습니다</h2>
          <p>{post.minRole} 전용 게시글입니다. 로그인 후 이용해 주세요.</p>
          <Link href="/" className={styles.backButton}>목록으로 돌아가기</Link>
        </div>
      ) : (
        <div className={styles.content}>
          <p>{post.summary}</p>
          <p>이곳에 실제 긴 본문 텍스트와 에디터에서 작성된 내용이 표시될 예정입니다.</p>
          <p>에디터는 드래그 앤 드롭을 지원하며 네이버 블로그 스타일의 잡지형 레이아웃을 제공할 것입니다.</p>
        </div>
      )}
    </div>
  );
}
