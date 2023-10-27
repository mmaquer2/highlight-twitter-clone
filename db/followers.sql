create table followers (
    id SERIAL PRIMARY KEY,
    follower_id INTEGER NOT NULL REFERENCES users(id),
    followee_id INTEGER NOT NULL REFERENCES users(id),
);


