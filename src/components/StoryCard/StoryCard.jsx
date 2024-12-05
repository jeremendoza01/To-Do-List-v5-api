// import React from "react";
import { Link } from "react-router-dom";
import "./styles-StoryCard.css"

export const StoryCard = ({ story, projectId, epicId }) => {
    // console.log(story)


    return (
        <Link
            to={`/my-projects/${projectId}/${epicId}/${story._id}`}
            className="link">
            <div className="story-card">
                <p className="name">{story.name}</p>
                <p className="description">{story.description}</p>
                <p className="icon-storycard">{story.icon}</p>
            </div>
        </Link>
    );
};