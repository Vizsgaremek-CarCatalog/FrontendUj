import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation } from "react-router-dom";
import "../index.css";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition
                in={true}
                appear={true}
                classNames="fade"
                timeout={300}>
            <div>Test Transition</div>
            </CSSTransition>
        </TransitionGroup>
    );
}