-- v2 of the posts table, used for adding more detail around post interactions
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    creator_avatr_url TEXT,
    posted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    like_count BIGINT DEFAULT 0,
    share_count BIGINT DEFAULT 0
);

