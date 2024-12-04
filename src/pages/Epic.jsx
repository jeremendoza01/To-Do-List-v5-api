import { useParams } from "react-router-dom";
import { StoryCard } from "../components/StoryCard/StoryCard";
import "./styles/styles-Epic.css";
import NavbarLogged from "../components/NavbarLogged/NavbarLogged";
import { useFetchEpicsById } from "../hooks/hookEpicsById";
import { useFetchStoriesEpic } from "../hooks/hookStoriesEpic";

export const Epic = () => {
    const { epicId, projectId } = useParams();
    const { data: epic, loading: loadingEpics } = useFetchEpicsById(epicId);
    const { data: storiesData = [], loading: loadingStories } = useFetchStoriesEpic(epicId);

    return (
        <>
            <NavbarLogged />
            <div className="container-epic">
                <div className="div-epic">
                    <h1 className="h1-epica">Detalles de la epica</h1>
                    {loadingEpics && <p>Cargando detalles de la epica</p>}
                    {epic && (
                        <div className="div-name-epic">
                            <h2 className="h2-descripcion">{epic.name} {epic.icon}</h2>
                            <p>Descripcion: {epic.description}</p>
                        </div>
                    )}
                </div>
                <div className="div-stories">
                    <h3 className="h3-historias">Historias:</h3>
                    {loadingStories ? (
                        <p>Cargando historias...</p>
                    ) : (storiesData.length > 0 ? (
                        <ul className="link-story">
                            {storiesData.map(story => (
                                <StoryCard key={story._id} story={story} epicId={epicId} projectId={projectId} />
                            ))}
                        </ul>
                    ) : (
                        <p>No hay historias disponibles.</p>
                    )

                    )}
                </div>
            </div>

        </>
    );
};
