import{createContext,useContext,useEffect,useState}from'react';import{useAuth}from'./AuthContext';
const ArticlesContext=createContext(null);
export function ArticlesProvider({children}){const{user}=useAuth();const [savedArticlesByUser,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem('newsreader_saved')||'{}')}catch{return {}}});
useEffect(()=>localStorage.setItem('newsreader_saved',JSON.stringify(savedArticlesByUser)),[savedArticlesByUser]);
const getUserSavedArticles=()=>user?(savedArticlesByUser[user.username]||[]):[];
const saveArticle = (article) => {
  if (!user) return;

  setSaved((prev) => ({
    ...prev,
    [user.username]: [
      ...(prev[user.username] || []).filter(
        (saved) => saved.id !== article.id
      ),
      article,
    ],
  }));
};
const removeArticle=id=>{if(!user)return;setSaved(prev=>({...prev,[user.username]:(prev[user.username]||[]).filter(a=>a.id!==id)}));};
const isArticleSaved=id=>getUserSavedArticles().some(a=>a.id===id);
const getAllUserArticles=()=>savedArticlesByUser;
return <ArticlesContext.Provider value={{savedArticlesByUser,getUserSavedArticles,saveArticle,removeArticle,isArticleSaved,getAllUserArticles}}>{children}</ArticlesContext.Provider>}
export const useArticles=()=>useContext(ArticlesContext);