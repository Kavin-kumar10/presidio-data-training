"use client"

import React, { createContext, useState, ReactNode, useContext } from 'react';

interface PostContextType {
  pop: boolean;
  togglePop: () => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [pop, setPop] = useState(false);

  const togglePop = () => {
    setPop(!pop);
  };

  return (
    <PostContext.Provider value={{ pop, togglePop }}>
      {children}
    </PostContext.Provider>
  );
};

// Custom hook for consuming the ThemeContext
// export const usePop = () => {
//     const context = useContext(PostContext);
//     if (!context) {
//       throw new Error('useTheme must be used within a ThemeProvider');
//     }
//     return context;
//   };