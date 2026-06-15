'use client';

import React, { useState } from 'react';
import { useAuth, Role } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './write.module.css';
import { ImagePlus, Type, AlignLeft, Bold, Italic } from 'lucide-react';

export default function WritePage() {
  const { role } = useAuth();
  const router = useRouter();
  const [minRole, setMinRole] = useState<Role>('비회원');
  const [category, setCategory] = useState('해외 캠프 정보');

  if (role !== '관리자') {
    return (
      <div className={styles.container}>
        <h2>관리자만 접근할 수 있습니다.</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>새 글 쓰기</h1>
        <button className={styles.submitButton} onClick={() => router.push('/')}>발행</button>
      </div>

      <div className={styles.layout}>
        <div className={styles.editorMain}>
          <div className={styles.toolbar}>
            <button className={styles.toolBtn}><Type size={18} /></button>
            <button className={styles.toolBtn}><Bold size={18} /></button>
            <button className={styles.toolBtn}><Italic size={18} /></button>
            <div className={styles.divider} />
            <button className={styles.toolBtn}><AlignLeft size={18} /></button>
          </div>

          <input 
            type="text" 
            placeholder="제목을 입력하세요" 
            className={styles.titleInput} 
          />

          <div className={styles.dropZone}>
            <ImagePlus size={32} color="var(--color-text-muted)" />
            <p>이미지를 드래그 앤 드롭하여 첨부하세요</p>
          </div>

          <textarea 
            className={styles.contentInput} 
            placeholder="본문을 작성하세요..."
          />
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.settingBlock}>
            <label className={styles.label}>카테고리</label>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              className={styles.select}
            >
              <option value="해외 캠프 정보">해외 캠프 정보</option>
              <option value="스쿨링 가이드">스쿨링 가이드</option>
            </select>
          </div>

          <div className={styles.settingBlock}>
            <label className={styles.label}>읽기 권한</label>
            <div className={styles.radioGroup}>
              {['비회원', '회원', '협력사', '관리자'].map(r => (
                <label key={r} className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="minRole" 
                    value={r} 
                    checked={minRole === r}
                    onChange={() => setMinRole(r as Role)} 
                  />
                  {r}
                </label>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
