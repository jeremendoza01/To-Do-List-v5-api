import ProjectCard from "../components/ProyectCard/ProyectCard";
import NavbarLogged from "../components/NavbarLogged/NavbarLogged";
import "./styles/styles-MyProjects.css";
import { useFetchProjects } from '../hooks/hookMyProjects';
import { useAuth } from "../auth/AuthProvider";

export const MyProjects = () => {
    const { data: projectsData, loading: loadingProjects } = useFetchProjects();
    const { user } = useAuth();

    if (!user) {
        return <p>No estás autenticado. Por favor, inicia sesión.</p>;
    }

    // Filtrar proyectos que pertenecen al usuario
    const projects = projectsData?.filter((project) => project.owner?.email === user?.email) || [];

    return (
        <>
            <NavbarLogged />
            <div className="container-proyects">
                <h2 className="h2-projects">Mis Proyectos</h2>
                <div className="div-projects">
                    {loadingProjects ? (
                        <p>Cargando proyectos...</p>
                    ) : projects.length > 0 ? (
                        projects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))
                    ) : (
                        <p>No hay proyectos creados.</p>
                    )}
                </div>
            </div>
        </>
    );
};
