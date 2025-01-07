import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div>
            <h2>What is Old-School Treasure Tracker?</h2>
            <p>
                Old-School Treasure Tracker is a webapp designed for use with
                Old-School Table Top Roleplaying Games, in particular{' '}
                <Link
                    to="https://necroticgnome.com/pages/about-old-school-essentials"
                    target="_blank"
                >
                    Old-School Essentials
                </Link>{' '}
                (OSE) by Gavin Norman. In Old-School games, characters gain
                Experience Points by retrieving gold and other treasures from
                dungeons and monster lairs. With OSTT, the Referee or Game
                Master can quickly add treasure found and monsters slain during
                a session and give out XP to the players without having to do
                calculations by hand.
            </p>

            <h2>What classes are available to select?</h2>
            <p>
                You can select classes from OSE Classic, Advanced and from the
                official zine Carcass Crawler.
            </p>
            <p>
                In the future, you may be able to add your own custom character
                classes for use with other games besides Old-School Essentials.
            </p>

            <h2>What are Feats of Exploration?</h2>
            <p>
                <Link
                    to="https://www.drivethrurpg.com/en/product/454780/feats-of-exploration"
                    target="_blank"
                >
                    Feats of Exploration
                </Link>{' '}
                are a set of rules created by{' '}
                <Link to="https://www.3d6downtheline.com/" target="_blank">
                    3d6 Down the Line
                </Link>{' '}
                to supplement the way characters gain XP is OSR games by
                rewarding characters for exploring dungeon rooms, completing
                quests, overcoming traps, etc.
            </p>

            <h2>Who am I?</h2>
            <p>
                I go by JP Dixon online. I am a programmer and I enjoy playing
                TTRPGs. I love the DIY aspect of the OSR community, which is why
                I decided to create this web app, for my own games, as well as
                for other people to enjoy and run games more easily.
            </p>
            <p>
                You can follow me at{' '}
                <Link target="_blank" to="https://jp-dixon.itch.io/">
                    itch.io
                </Link>{' '}
                ,{' '}
                <Link
                    target="_blank"
                    to="https://bsky.app/profile/jpdixon.bsky.social"
                >
                    bluesky
                </Link>{' '}
                and{' '}
                <Link target="_blank" to="https://x.com/jp_dixon99">
                    twitter
                </Link>
                .
            </p>

            <h2>About the project</h2>
            <p>
                This web app was created with React and Typescript, and styles
                with SCSS. You can find the project page on{' '}
                <Link
                    target="_blank"
                    to="https://github.com/DrJP99/old-school-treasure-tracker"
                >
                    github
                </Link>
                .
            </p>
            <p>
                The website is hosted on{' '}
                <Link target="_blank" to="https://www.netlify.com/">
                    Netlify
                </Link>{' '}
                for free.
            </p>
            <p>
                OSTT does not have a back-end server and your data is stored in
                local storage. What this means is that I don't have access to
                any of your settings or the way you use this web-app. A downside
                of this is that you cannot transfer characters, treasure, or
                settings from one device to another.
            </p>
            <br />
            <p>JP Dixon© 2025</p>
        </div>
    )
}

export default About
