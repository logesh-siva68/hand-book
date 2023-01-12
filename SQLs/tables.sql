--Databas
--CREATE DATABASE developer_hand_book;

-- 01 Users (developers)
--DROP TABLE hb_users
CREATE TABLE IF NOT EXISTS hb_users (
    u_id SERIAL PRIMARY KEY,
    u_name TEXT NOT NULL,
    u_email TEXT UNIQUE NOT NULL ,
    u_password TEXT,
    u_roles JSON,
    eff_status TEXT NOT NULL,
    added_date TIMESTAMP WITH TIME ZONE NOT NULL,
    added_by TEXT NOT NULL,
    edited_date TIMESTAMP WITH TIME ZONE NOT NULL,
    edited_by TEXT NOT NULL
);

TRUNCATE TABLE hb_users RESTART IDENTITY;




INSERT INTO hb_users (u_name, u_password,  u_email, eff_status, added_date,added_by,edited_date, edited_by ) VALUES ($1,$2,$3)
-- 02 Clients for the org

DROP TABLE hb_clients;
CREATE TABLE IF NOT EXISTS hb_clients(
    c_id SERIAL PRIMARY KEY,
    c_name TEXT NOT NULL,
    -- c_coordinate_person TEXT NOT NULL,
    -- c_coordinate_person_phone TEXT NOT NULL,
    -- c_coordinate_person_email TEXT NOT NULL,
    other_dtl JSON, -- Can be anything, Like meeting link, domain name and so on...
    eff_status TEXT NOT NULL,
    added_date TIMESTAMP WITH TIME ZONE NOT NULL,
    added_by TEXT NOT NULL,
    edited_date TIMESTAMP WITH TIME ZONE NOT NULL,
    edited_by TEXT NOT NULL
);

-- 03 Master
DROP TABLE hb_master;
CREATE TABLE IF NOT EXISTS hb_master (
    m_code TEXT PRIMARY KEY,
    m_name TEXT NOT NULL,
    eff_status TEXT NOT NULL,
    added_date TIMESTAMP WITH TIME ZONE NOT NULL,
    added_by TEXT NOT NULL,
    edited_date TIMESTAMP WITH TIME ZONE NOT NULL,
    edited_by TEXT NOT NULL
);

-- 04 Master Items
DROP TABLE hb_master_item;
CREATE TABLE IF NOT EXISTS hb_master_item (
    mi_code TEXT PRIMARY KEY,
    m_code TEXT NOT NULL,
    mi_name TEXT NOT NULL,
    eff_status TEXT NOT NULL,
    added_date TIMESTAMP WITH TIME ZONE NOT NULL,
    added_by TEXT NOT NULL,
    edited_date TIMESTAMP WITH TIME ZONE NOT NULL,
    edited_by TEXT NOT NULL
);


-- 05 Posts
DROP TABLE hb_posts;
CREATE TABLE IF NOT EXISTS hb_posts (
    post_id   SERIAL PRIMARY KEY,
    u_id NUMERIC NOT NULL,
    post_title TEXT NOT NULL,
    post_content TEXT NOT NULL,
     eff_status TEXT NOT NULL,
    added_date TIMESTAMP WITH TIME ZONE NOT NULL,
    added_by TEXT NOT NULL,
    edited_date TIMESTAMP WITH TIME ZONE NOT NULL,
    edited_by TEXT NOT NULL
);
