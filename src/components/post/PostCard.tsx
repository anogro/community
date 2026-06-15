import React from 'react';
import Link from 'next/link';
import styles from './PostCard.module.css';
import Badge from '@/components/common/Badge';
import { Lock } from 'lucide-react';
import { Role } from '@/context/AuthContext';

export interface Post {
  id: string;
  title: string;
  summary: string;
  thumbnail: string;
  date: string;
  minRole: Role;
  category: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/post/${post.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.dummyImage} style={{ backgroundColor: '#eaeaea' }}>
          <img src={post.thumbnail} alt={post.title} className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <Badge variant="outline">{post.category}</Badge>
          <span className={styles.date}>{post.date}</span>
        </div>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.summary}>{post.summary}</p>
        <div className={styles.footer}>
          {post.minRole !== '비회원' && (
            <Badge variant="secondary">
              <Lock size={12} />
              {post.minRole} 전용
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
