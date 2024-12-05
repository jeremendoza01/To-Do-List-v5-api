import NavbarLogged from "../components/NavbarLogged/NavbarLogged";
import "../pages/styles/styles-MyStories.css";
import { StoryCard } from "../components/StoryCard/StoryCard";
import { hookStories } from "../hooks/hookStories";
import { useAuth } from "../auth/AuthProvider";
export const MyStories = () => {
    const { user, isLoading: authLoading } = useAuth();
    const { data: storiesData, loading: loadingStories } = hookStories();

    // Esperar que se carguen los datos de autenticación y las historias
    if (authLoading || loadingStories) {
        return <p>Cargando...</p>;
    }

    // Verificar si el usuario está autenticado
    if (!user) {
        return <p>No estás autenticado. Por favor, inicia sesión.</p>;
    }

    // Filtrar las historias donde el username del propietario coincide con el del usuario
    const stories = storiesData?.filter((story) => {
        // Usamos username para comparar
        return story.owner?.username === user?.username;
    }) || [];


    return (
        <>
            <NavbarLogged />
            <div className="div-historias">
                <h1>Mis historias</h1>
                {loadingStories && <p>Cargando historias...</p>}
                {!loadingStories && stories.length === 0 && (
                    <p>No tienes historias creadas aún.</p>
                )}
                {!loadingStories && stories.length > 0 && (
                    stories.map(story => (
                        <div className="div-storys" key={story._id}>
                            <StoryCard story={story} />
                        </div>
                    ))
                )}
            </div>
        </>
    );
};
