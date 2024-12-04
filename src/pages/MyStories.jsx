import NavbarLogged from "../components/NavbarLogged/NavbarLogged";
import "../pages/styles/styles-MyStories.css";
import { StoryCard } from "../components/StoryCard/StoryCard";
import { hookStories } from "../hooks/hookStories";
import { useAuth } from "../auth/AuthProvider";

export const MyStories = () => {
    const { user } = useAuth();
    const { data: storiesData, loading: loadingStories } = hookStories();

    const stories = storiesData.filter((story) => story.owner === user._id);

    return (
        <>
            <NavbarLogged />
            <div className="div-historias">
                <h1>Mis historias</h1>
                {loadingStories ? (
                    <p>Cargando historias...</p>
                ) : (
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
