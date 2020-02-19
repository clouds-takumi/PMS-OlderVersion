import { Component } from 'react'
import s from './index.less'

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={s.projectsRoot}>project</div>
        );
    }
}

export default Projects;