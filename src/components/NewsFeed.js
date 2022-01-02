import { useEffect, useState } from "react"
import axios from "axios";

const NewsFeed = () => {
    const [getArticles, setArticles] = useState(null)
    
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/news',
        };

        axios.request(options).then((response) => {
            setArticles(response.data)
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    const first7Articles = getArticles?.slice(0,7)

    return (
        <div className="news-feed">
            <h2> News Feed</h2>
            {first7Articles?.map((article,_index) => (<div key={_index}><a href={article.url}><p>{article.title}</p></a></div>))}
        </div>

    )
}

export default NewsFeed