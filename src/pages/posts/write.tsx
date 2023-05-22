import { useState } from "react";
import { api } from "~/utils/api";


const Write = () => {
  const testUserJohnSmithId = 'clhxxk55d0000vtmn403kw8q7';
  const [ title, setTitle ] = useState('');
  const [ content, setContent] = useState('');
  const publishMutation = api.posts.publish.useMutation();
  return (
    <form>
      <input type="text" placeholder="Title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
      <input type="text" placeholder="What's on your mind?" value={content} onChange={(e) => {setContent(e.target.value)}} />
      <button onClick={(e) => {
        e.preventDefault();
        publishMutation.mutate({ title, content, authorId: testUserJohnSmithId })
      }}>Publish</button>
    </form>
  )
}

export default Write;