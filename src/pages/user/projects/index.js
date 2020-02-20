import { Component } from 'react'
import s from './index.less'
import Project from '../../project'

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={s.projectsRoot}>
                <Project />
            </div>
        );
    }
}

export default Projects;