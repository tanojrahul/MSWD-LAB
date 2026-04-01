// Experiment 18: TypeScript React
// React app with TypeScript for type safety

import React, { useState, useEffect } from 'react';
import { FC, ReactNode } from 'react';

// ============================================
// INTERFACES/TYPES
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface CardProps {
  title: string;
  content: string;
  children?: ReactNode;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Button Component
export const Button: FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary'
}) => {
  const className = `btn btn-${variant}`;
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// Card Component
export const Card: FC<CardProps> = ({ title, content, children }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
      {children}
    </div>
  );
};

// ============================================
// CUSTOM HOOKS
// ============================================

// useAsync Hook
interface UseAsyncState<T> {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: T | null;
  error: Error | null;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
): UseAsyncState<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    status: 'idle',
    data: null,
    error: null
  });

  useEffect(() => {
    if (!immediate) return;

    const execute = async () => {
      setState({ status: 'loading', data: null, error: null });
      try {
        const response = await asyncFunction();
        setState({ status: 'success', data: response, error: null });
      } catch (error) {
        setState({ status: 'error', data: null, error: error as Error });
      }
    };

    execute();
  }, [asyncFunction, immediate]);

  return state;
}

// useFetch Hook
export function useFetch<T>(url: string): UseAsyncState<T> {
  return useAsync<T>(
    () => fetch(url).then(res => res.json()),
    true
  );
}

// useLocalStorage Hook
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// ============================================
// TYPED COMPONENTS
// ============================================

// User Profile Component
interface UserProfileProps {
  user: User;
  onUpdate?: (user: User) => void;
}

export const UserProfile: FC<UserProfileProps> = ({ user, onUpdate }) => {
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <Button
        label="Update Profile"
        onClick={() => onUpdate?.(user)}
      />
    </div>
  );
};

// Post List Component
interface PostListProps {
  posts: Post[];
  onDelete?: (id: number) => void;
}

export const PostList: FC<PostListProps> = ({ posts, onDelete }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Card
          key={post.id}
          title={post.title}
          content={post.content}
        >
          <p className="author">By {post.author}</p>
          <Button
            label="Delete"
            onClick={() => onDelete?.(post.id)}
            variant="danger"
          />
        </Card>
      ))}
    </div>
  );
};

// Form Component with Typed States
export const Form: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <Button label="Submit" onClick={() => {}} />
    </form>
  );
};

// ============================================
// UTILITY FUNCTIONS WITH TYPES
// ============================================

export function filterPostsByAuthor(posts: Post[], author: string): Post[] {
  return posts.filter(post => post.author === author);
}

export function filterUsersByRole(users: User[], role: User['role']): User[] {
  return users.filter(user => user.role === role);
}

export function getUsersWithPosts(
  users: User[],
  posts: Post[]
): (User & { postCount: number })[] {
  return users.map(user => ({
    ...user,
    postCount: posts.filter(p => p.author === user.name).length
  }));
}

// ============================================
// EXAMPLE USAGE
// ============================================

/*
import { UserProfile, PostList, Form, useFetch, useLocalStorage } from './App';

export const App: FC = () => {
  const user: User = { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' };
  const [savedUser, setSavedUser] = useLocalStorage<User>('user', user);

  const posts: Post[] = [
    { 
      id: 1, 
      title: 'TypeScript Tips', 
      content: 'Learn TS', 
      author: 'Alice',
      createdAt: new Date()
    }
  ];

  return (
    <div>
      <UserProfile user={savedUser} onUpdate={setSavedUser} />
      <PostList posts={posts} />
      <Form />
    </div>
  );
};
*/
