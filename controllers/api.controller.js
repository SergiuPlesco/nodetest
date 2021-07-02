import data from "../data.js";
import axios from "axios";
import dotend from "dotenv";
dotend.config();
import fs from "fs";

const URL = process.env.URL;

const publicResourcePosts = (req, res) => {
	axios
		.get(URL + "/posts")
		.then((response) => {
			return res.status(200).json(response.data);
		})
		.catch((error) => {
			return res
				.status(404)
				.json({ error: error.message, message: "Something went wrong while fetching data." });
		});
};

const publicResourceGetPostsById = (req, res) => {
	const id = req.params.id;
	axios
		.get(URL + "/posts/" + id)
		.then((response) => {
			return res.status(200).json(response.data);
		})
		.catch((error) => {
			return res
				.status(404)
				.json({ error: error.message, message: "Something went wrong while fetching data." });
		});
};

const publicResourceGetPostsCreate = (req, res) => {
	const post = {
		title: req.body.title,
		body: req.body.body,
		userId: 1111,
	};
	axios
		.post(URL + "/posts/", post)
		.then((response) => {
			return res.status(200).json(response.data);
		})
		.catch((error) => {
			return res
				.status(404)
				.json({ error: error.message, message: "Something went wrong while creating a new post." });
		});
};

const publicResourceGetPostsDelete = (req, res) => {
	const id = req.params.id;
	axios
		.delete(URL + "/posts/" + id)
		.then(() => {
			return res.status(200).json({ message: "Post deleted" });
		})
		.catch((error) => {
			return res
				.status(404)
				.json({ error: error.message, message: "Something went wrong while deleting the post" });
		});
};

const blogs_all = (req, res) => {
	fs.readFile("./blogs.json", "utf-8", (error, jsonString) => {
		if (error) {
			throw Error("Could not read file");
		} else {
			try {
				const blogs = JSON.parse(jsonString);
				return res.status(200).json(blogs);
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}
		}
	});
};

const blogs_by_id = (req, res) => {
	const id = req.params.id;
	fs.readFile("./blogs.json", "utf-8", (error, jsonString) => {
		if (error) {
			throw Error("Could not read file");
		} else {
			try {
				const blogs = JSON.parse(jsonString);
				const blog = blogs.filter((blog) => blog.id == id);
				return res.status(200).json(blog);
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}
		}
	});
};

const blogs_update = (req, res) => {
	const id = req.params.id;
	fs.readFile("./blogs.json", "utf-8", (error, jsonString) => {
		if (error) {
			throw Error("Could not read file");
		} else {
			try {
				const blogs = JSON.parse(jsonString);

				blogs.forEach((blog) => {
					if (blog.id == id) {
						blog.title = req.body.title;
						blog.body = req.body.body;
					}
				});
				console.log(blogs);
				fs.writeFile("./blogs.json", JSON.stringify(blogs, null, 2), (error) => {
					if (error) {
						throw Error("Could not write file");
					}
				});
				return res.status(200).json(blogs);
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}
		}
	});
};

const blogs_add = (req, res) => {
	const newBlog = {
		id: req.body.id,
		title: req.body.title,
		body: req.body.body,
	};

	fs.readFile("./blogs.json", "utf-8", (error, jsonString) => {
		if (error) {
			throw Error("Could not read file");
		} else {
			try {
				const blogs = JSON.parse(jsonString);
				const blogsArr = Array.from(blogs);
				blogsArr.push(newBlog);
				console.log(blogsArr);
				fs.writeFile("./blogs.json", JSON.stringify(blogsArr, null, 2), (error) => {
					if (error) {
						throw Error("Could not write file");
					}
				});
				return res.status(200).json(newBlog);
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}
		}
	});
};

const blogs_delete = (req, res) => {
	const id = req.params.id;
	fs.readFile("./blogs.json", "utf-8", (error, jsonString) => {
		if (error) {
			throw Error("Could not read file");
		} else {
			try {
				const blogs = JSON.parse(jsonString);
				const blogsUpdated = blogs.filter((blog) => blog.id != id);

				fs.writeFile("./blogs.json", JSON.stringify(blogsUpdated, null, 2), (error) => {
					if (error) {
						throw Error("Could not save file");
					}
				});
				return res.status(200).json(blogsUpdated);
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}
		}
	});
};

export default {
	publicResourcePosts,
	publicResourceGetPostsById,
	publicResourceGetPostsCreate,
	publicResourceGetPostsDelete,
	blogs_all,
	blogs_by_id,
	blogs_add,
	blogs_update,
	blogs_delete,
};
