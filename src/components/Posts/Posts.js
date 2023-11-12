import { React, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import "./Posts.css"

let pageSize = 20;

export default function Posts() {
    const [posts, pending, error] = useFetch("https://jsonplaceholder.typicode.com/todos")
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedPosts, setPaginatedPosts] = useState([]);
    // set how many pages we need based on page size and number of posts
    const pageCount = Math.ceil(posts.length / pageSize);
    // it creates an array from the given object(length of array) and a mapping function 
    let pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);
    
    useEffect(() => {
        const lastIndex = pageSize * currentPage;
        const fristIndex = lastIndex - pageSize;
        const currentPosts = posts.slice(fristIndex,lastIndex)
        // set the sorted posts of current page to a new state
        setPaginatedPosts(currentPosts)
    }, [posts,currentPage])

    return (
        <div>
            {error ? <h3>Something went wrong</h3> : ""}
            {pending ? <h2>Loading...</h2> : (
                // list of posts
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedPosts.map(post => {
                            return <tr key={post.id}>
                                <th scope="row">{post.id}</th>
                                <td>{post.title}</td>
                                {post.completed ? (
                                    <td><button type="button" className="btn btn-success">completed</button></td>
                                ) : (
                                    <td><button type="button" className="btn btn-warning">pending</button></td>
                                )}
                            </tr>
                        })}

                    </tbody>
                </table>)}

                {/* page number buttons */}
            <nav className='d-flex justify-content-center' aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item" onClick={() => setCurrentPage(pre => pre - 1)}>
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {pageNumbers.map(pageNumber => {
                        return (
                            <li
                                key={pageNumber}
                                className={currentPage === pageNumber ? "page-item active" : "page-item"}
                                aria-current="page"
                                onClick={() => setCurrentPage(pageNumber)}
                            >
                                <a className="page-link" href="#">{pageNumber}</a>
                            </li>
                        )
                    })}

                    <a className="page-link"
                        onClick={() => setCurrentPage(pre => pre + 1)}
                        href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </ul>
            </nav>

        </div>
    )
}
