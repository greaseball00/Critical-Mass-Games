'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Trash2, MessageSquare, Send } from 'lucide-react';

type PostWithProfile = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  profiles: { username: string | null; full_name: string | null } | null;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function BoardPage() {
  const { user } = useAuth();
  const supabase = createClient();

  const [posts, setPosts] = useState<PostWithProfile[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(username, full_name)')
      .order('created_at', { ascending: false });
    if (!error && data) setPosts(data as PostWithProfile[]);
    setLoadingPosts(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setFormError('');
    setSubmitting(true);

    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      title: title.trim(),
      content: content.trim(),
    });

    if (error) {
      setFormError(error.message);
    } else {
      setTitle('');
      setContent('');
      await fetchPosts();
    }
    setSubmitting(false);
  };

  const handleDelete = async (postId: string) => {
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    if (!error) setPosts(prev => prev.filter(p => p.id !== postId));
    else setError('Could not delete post.');
  };

  const displayName = (p: PostWithProfile) =>
    p.profiles?.username || p.profiles?.full_name?.split(' ')[0] || 'Operative';

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="rad-badge" style={{ marginBottom: '0.75rem' }}>Community Comms</div>
        <h1 style={{ color: '#39ff14', fontWeight: 900, fontSize: '2rem', letterSpacing: '0.05em', textTransform: 'uppercase', textShadow: '0 0 15px rgba(57,255,20,0.5)', marginBottom: '0.5rem' }}>
          Message Board
        </h1>
        <p style={{ color: '#7ab87a', fontSize: '0.9rem' }}>
          Share game recaps, find players, or just say hi.
        </p>
      </div>

      {/* New post form */}
      {user ? (
        <div className="panel glow-border" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#39ff14', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            New Post
          </h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Post title..."
              required
              minLength={3}
              maxLength={120}
              style={{ width: '100%', padding: '0.65rem 0.9rem', fontSize: '0.95rem' }}
            />
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="What's on your mind? (10–2000 characters)"
              required
              minLength={10}
              maxLength={2000}
              rows={4}
              style={{ width: '100%', padding: '0.65rem 0.9rem', fontSize: '0.9rem', resize: 'vertical', fontFamily: 'Courier New, monospace', background: 'rgba(57,255,20,0.03)', border: '1px solid rgba(57,255,20,0.2)', color: '#c8f5c2' }}
            />
            {formError && (
              <div style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.4)', padding: '0.6rem', color: '#ff8888', fontSize: '0.85rem' }}>
                ⚠ {formError}
              </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary"
              style={{ alignSelf: 'flex-start', opacity: submitting ? 0.6 : 1, cursor: submitting ? 'wait' : 'pointer' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Send size={14} /> {submitting ? 'Posting...' : 'Post'}
              </span>
            </button>
          </form>
        </div>
      ) : (
        <div className="panel" style={{ padding: '1.25rem', marginBottom: '2rem', textAlign: 'center', color: '#7ab87a', fontSize: '0.9rem' }}>
          <MessageSquare size={20} style={{ color: '#39ff14', marginBottom: '0.5rem' }} />
          <p>
            <Link href="/auth/login" style={{ color: '#39ff14', textDecoration: 'none' }}>Log in</Link>{' '}
            to post a message.
          </p>
        </div>
      )}

      {/* Post list */}
      {error && (
        <div style={{ color: '#ff8888', fontSize: '0.85rem', marginBottom: '1rem' }}>⚠ {error}</div>
      )}

      {loadingPosts ? (
        <div style={{ color: '#7ab87a', textAlign: 'center', padding: '3rem' }}>Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="panel" style={{ padding: '2.5rem', textAlign: 'center', color: '#4a6b4a' }}>
          No posts yet. Be the first to say something.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {posts.map(post => (
            <div key={post.id} className="panel glow-border" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#39ff14', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.02em' }}>
                    {post.title}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#4a6b4a', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                    <span style={{ color: '#7ab87a' }}>{displayName(post)}</span>
                    {' · '}
                    {formatDate(post.created_at)}
                  </div>
                  <p style={{ color: '#c8f5c2', fontSize: '0.9rem', lineHeight: 1.65, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {post.content}
                  </p>
                </div>
                {user?.id === post.user_id && (
                  <button
                    onClick={() => handleDelete(post.id)}
                    title="Delete post"
                    style={{ background: 'none', border: 'none', color: '#4a6b4a', cursor: 'pointer', padding: '0.25rem', flexShrink: 0, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ff8888'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4a6b4a'}
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
