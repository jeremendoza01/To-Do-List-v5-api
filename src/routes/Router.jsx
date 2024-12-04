import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import { Epic } from "../pages/Epic"
import { MyProjects } from "../pages/MyProjects"
import { Story } from "../pages/Story"
import { LoginPage } from "../pages/Login"
import { MyStories } from "../pages/MyStories"
import ProjectDetails from "../pages/ProjectDetails"
import Settings from "../pages/Settings"
import { ProtetedRoute } from "../pages/ProtectedRoute"
import { Dashboard } from "../pages/Dashboard"
import { AuthRoute } from "../pages/AuthRoute"

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthRoute >
                <Home />
            </AuthRoute>
        ),
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: '/',
        element: <ProtetedRoute />,
        children: [
            {
                path: '/home',
                element: <Dashboard />
            },
            {
                path: "/my-projects",
                element: <MyProjects />,
            },
            {
                path: "/my-projects/:projectId",
                element: <ProjectDetails />,
            },
            {
                path: "/my-projects/:projectId/:epicId",
                element: <Epic />,
            },
            {
                path: "/my-projects/:projectId/:epicId/:storyId",
                element: <Story />,
            },
            {
                path: "/my-stories",
                element: <MyStories />,
            },
            {
                path: "/settings",
                element: <Settings />,
            }
        ]
    }
]);

export default router;