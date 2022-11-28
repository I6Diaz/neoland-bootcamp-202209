import log from '../utils/coolog'
import { useState, useEffect } from 'react'
import retrieveAUser from '../logic/retrieveAUser'
import retrievePostsFromUser from '../logic/retrievePostsFromUser'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'

export default function({ onLoggedOut }) {
    log.info('Profile -> render')

    const [user, setUser] = useState()
    const [posts, setPosts] = useState()
    const { targetUserId } = useParams()

    useEffect(() => {
        try{
            retrieveAUser(sessionStorage.userId, targetUserId, (error, user) => {
                if(error) {
                    alert(error.message)

                    return
                }

                try{
                    retrievePostsFromUser(sessionStorage.userId, targetUserId, (error, posts) => {
                        if(error) {
                            alert(error.message)

                            return
                        }

                        setUser(user)
                        setPosts(posts)
                    })
                }catch (error) {
                    alert(error.message)
                }
            })
        }catch (error) {
            alert(error.message)
        }
    }, [])

    return <main className="overflow-hidden">
    <Header userName={user?.name} onLoggedOut={onLoggedOut} />

    {posts && <div className="flex flex-col items-center gap-2 py-[2rem]">
        {posts.map(post => <article key={post.id} className="border rounded-xl w-[50%] flex flex-col p-5">
            <p>{post.text}</p>
            <time>{post.date}</time>
        </article>)}
    </div>}
</main>

} 