import { Link } from 'react-router-dom'
import "./styles.css"

const ProyectCard = ({ project }) => {

    if (!project) {
        return null;
    }

    return (
        <>
            <div className='div-projects-card'>
                <Link to={`/my-projects/${project._id}`} className='link-project'>
                    <div className='card-project'>
                        <h2 className='name-proyect'>{project.name}</h2>
                    </div>
                </Link>
            </div >

        </>
    )
}

export default ProyectCard