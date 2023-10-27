 -- v1 of the posts table, used for testing post routes
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL
);


-- v2 of the posts table
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,           -- Unique identifier for each post using SERIAL for auto-increment
    user_id INTEGER NOT NULL REFERENCES users(id),  -- Foreign key linking to the user who posted with a reference to 'users' table
    content TEXT NOT NULL,                -- Text content of the post
    image_url TEXT,                       -- URL of any attached image
    posted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- Time the post was created with timezone information
    like_count BIGINT DEFAULT 0,          -- Count of likes on the post
    retweet_count BIGINT DEFAULT 0,       -- Count of retweets on the post
    reply_to_post_id INTEGER REFERENCES posts(post_id) -- If the post is a reply, this points to the original post
);