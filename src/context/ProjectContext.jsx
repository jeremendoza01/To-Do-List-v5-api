import react, { createContext, useEffect, useState } from "react";
import { mockProjects } from "../mocks/mockProjects";
import { mockEpics } from "../mocks/mockEpics";
import { mockStories } from "../mocks/mockStories";
import { mockTasks } from "../mocks/mockTasks";

export const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
    const [projectsData, setProjectsData] = useState([]);
    const [epicsData, setEpicsData] = useState([]);
    const [storiesData, setStoriesData] = useState([]);
    const [tasksData, setTasksData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                setTimeout(() => {
                    setProjectsData(mockProjects);
                    setEpicsData(mockEpics);
                    setStoriesData(mockStories);
                    setTasksData(mockTasks);
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.log("Error al obtener los proyectos");
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <ProjectContext.Provider
            value={{ projectsData, loading, epicsData, storiesData, tasksData }}
        >
            {children}
        </ProjectContext.Provider>
    );
};
