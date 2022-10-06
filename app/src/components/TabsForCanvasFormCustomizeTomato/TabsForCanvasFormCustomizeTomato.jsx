import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {CreateTomatoCycleTabOffCanvas} from "./CreateTomatoCycleTabOffCanvas/CreateTomatoCycleTabOffCanvas";

export const TabsForCanvasFormCustomizeTomato = () => {
    return (
        <>
            <Tabs
                defaultActiveKey="createTomatoCycle"
                id="uncontrolled-tab-example"
                className="mb-3 d-flex align-items-center justify-content-evenly"
            >
                <Tab eventKey="createTomatoCycle" title="Create Tomato Cycle">
                    <CreateTomatoCycleTabOffCanvas />
                </Tab>
                <Tab eventKey="actionsTomato" title="Actions Tomato">
                    <div>Profile</div>
                </Tab>
                <Tab eventKey="drafts" title="Drafts">
                    <div>Contact</div>
                </Tab>
            </Tabs>
        </>
    );
}