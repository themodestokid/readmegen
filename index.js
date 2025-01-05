// TODO: Include packages needed for this application
import fs from 'fs';
import inquirer from 'inquirer';

const licenses = {
    MIT: {
        name: "MIT License",
        logo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/7195e121-eded-45cf-9aab-909deebd81b2/d9ur2lg-28410b47-58fd-4a48-9b67-49c0f56c68ce.png/v1/fill/w_1035,h_772,q_70,strp/mit_license_logo_by_excaliburzero_d9ur2lg-pre.jpg"
    },
    GPL: {
        name: "GNU General Public Licenses",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/GPLv3_Logo.svg/220px-GPLv3_Logo.svg.png"
    },
    Mozilla: {
        name: "Mozilla Public License 2.0",
        logo: "https://fossa.com/blog/content/images/size/w800h400/2021/04/mozilla-101.png"
    },
    Public: {
        name: "Public Domain"
    }
}

// TODO: Create an array of questions for user input
const questions = [
    {
        message: 'Project title (required)',
        name: 'title',
        type: 'input'
    },
    {
        message: 'Project description (required)',
        name: 'description',
        type: 'input'
    },
    {
        message: 'Installation instructions',
        name: 'installation',
        type: 'input'
    },
    {
        message: 'Usage',
        name: 'usage',
        type: 'input'
    },
    {
        message: 'Contribution guidelines',
        name: 'contribution',
        type: 'input'
    },
    {
        message: 'Tests',
        name: 'tests',
        type: 'input'
    },
    {
        message: 'License',
        name: 'license',
        type: 'list',
        choices: Object.keys(licenses),
    },
    {
        message: 'Github username',
        name: 'github',
        type: 'input'
    },
    {
        message: 'Email address',
        name: 'email',
        type: 'input'
    }
];

function badgeFor(license) {
    if (licenses[license] && licenses[license].logo) {
        return `![${licenses[license].name}](${licenses[license].logo})`;
    }
    return "";        
}

// TODO: Create a function to write README file
function writeToFile(data) {
    if (!data.title) {
        console.error("No project title provided");
        return;
    }
    if (!data.description) {
        console.error("No project description provided");
        return;
    }
    const sections = {
        Description: data.description
    }

    if (data.installation) {
        sections["Installation instructions"] = data.installation;
    }
    if (data.usage) {
        sections["Usage"] = data.usage;
    }
    if (data.contribution) {
        sections["Contribution guidelines"] = data.contribution;
    }
    if (data.tests) {
        sections["Tests"] = data.tests;
    }
    if (data.license) {
        sections["License"] = `${data.title} is licensed under ${licenses[data.license].name}`
    }
    if (data.github || data.email) {
        let q = "";
        if (data.github) {
            q = `* [${data.github} github profile](http://github.com/${data.github})\n`
        }
        if (data.email) {
            q = q + `* [${data.email}](mailto:${data.email})`
        }
        sections["Questions"] = q;
    }
    let output = `# ${data.title}\n\n${badgeFor(data.license)}\n\n`;

    for (const k of Object.keys(sections)) {
        output = output + `1. [${k}](#${k.toLowerCase().replaceAll(" ", "-")})\n`
    }
    output = output + '\n';

    for (const k of Object.keys(sections)) {
        output = output + `## ${k}\n\n${sections[k]}\n\n`;
    }
       
    fs.writeFile("README.md", output, (err) => 
                    console.log(err ? err : "wrote README.md"));
}

// TODO: Create a function to initialize app
function init() {
    console.log("README creator");
    inquirer.prompt(questions).then(data => writeToFile(data));
}

// Function call to initialize app
init();
