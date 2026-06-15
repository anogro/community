'use client';

import React, { useState } from 'react';
import CategoryTabs from '@/components/post/CategoryTabs';
import PostCard, { Post } from '@/components/post/PostCard';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import styles from './page.module.css';

const CATEGORIES = ['전체', '해외 캠프 정보', '스쿨링 가이드'];

export const DUMMY_POSTS: Post[] = [
  {
    id: '1',
    title: '2027년 여름 싱가포르 영어 캠프 모집 안내',
    summary: '초등학생 자녀를 둔 학부모님을 위한 4주 과정 프리미엄 영어 캠프 정보입니다. 다양한 엑티비티와 함께 영어 실력을 키울 수 있습니다.',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop',
    date: '2026-06-15',
    minRole: '비회원',
    category: '해외 캠프 정보',
  },
  {
    id: '2',
    title: '캐나다 밴쿠버 1년 스쿨링 준비 체크리스트',
    summary: '비자 발급부터 거주지 구하기까지, 성공적인 스쿨링을 위한 모든 것을 담았습니다. 미리 준비해야 할 서류를 확인하세요.',
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop',
    date: '2026-06-10',
    minRole: '회원',
    category: '스쿨링 가이드',
  },
  {
    id: '3',
    title: '[협력사 전용] 하와이 겨울 캠프 파트너십 자료',
    summary: '이번 겨울 하와이 캠프 진행을 위한 세부 일정 및 제휴 단가표입니다. 보안을 유지해주시기 바랍니다.',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
    date: '2026-06-05',
    minRole: '협력사',
    category: '해외 캠프 정보',
  },
  {
    id: '4',
    title: '필리핀 세부 관리형 유학 3개월 후기',
    summary: '아이가 너무 만족해했던 세부 관리형 스쿨링 생생한 후기를 전해드려요. 학원 시설과 숙소 정보를 자세히 적어보았습니다.',
    thumbnail: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&auto=format&fit=crop',
    date: '2026-06-01',
    minRole: '비회원',
    category: '스쿨링 가이드',
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const { role } = useAuth();

  const filteredPosts = activeCategory === '전체' 
    ? DUMMY_POSTS 
    : DUMMY_POSTS.filter(p => p.category === activeCategory);

  return (
    <div className={styles.container}>
      <CategoryTabs 
        categories={CATEGORIES} 
        activeCategory={activeCategory} 
        onSelect={setActiveCategory} 
      />
      
      <div className={styles.grid}>
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {role === '관리자' && (
        <Link href="/write" className={styles.fab}>
          <Plus size={24} />
          글쓰기
        </Link>
      )}
    </div>
  );
}
