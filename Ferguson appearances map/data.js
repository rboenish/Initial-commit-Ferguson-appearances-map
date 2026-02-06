// Washington State County Populations (2020 Census)
const countyPopulations = {
    "Adams": 20613,
    "Asotin": 22582,
    "Benton": 206873,
    "Chelan": 79074,
    "Clallam": 77155,
    "Clark": 503311,
    "Columbia": 3952,
    "Cowlitz": 110730,
    "Douglas": 42938,
    "Ferry": 7178,
    "Franklin": 96749,
    "Garfield": 2286,
    "Grant": 99123,
    "Grays Harbor": 75061,
    "Island": 86857,
    "Jefferson": 32977,
    "King": 2269675,
    "Kitsap": 275611,
    "Kittitas": 44337,
    "Klickitat": 22735,
    "Lewis": 82149,
    "Lincoln": 10944,
    "Mason": 65726,
    "Okanogan": 42104,
    "Pacific": 23365,
    "Pend Oreille": 13401,
    "Pierce": 921130,
    "San Juan": 17788,
    "Skagit": 129523,
    "Skamania": 12036,
    "Snohomish": 827957,
    "Spokane": 539339,
    "Stevens": 46445,
    "Thurston": 294793,
    "Wahkiakum": 4422,
    "Walla Walla": 62584,
    "Whatcom": 226847,
    "Whitman": 47973,
    "Yakima": 256728
};

// Appearance counts by county
const countyAppearances = {
    "Thurston": 9,
    "King": 5,
    "Pierce": 5,
    "Whatcom": 4,
    "Clark": 2,
    "Grays Harbor": 2,
    "Benton": 1,
    "Chelan": 1,
    "Clallam": 1,
    "San Juan": 1
};

// Monthly appearance counts
const monthlyAppearances = [
    { month: "2025-01", count: 2, label: "Jan 2025" },
    { month: "2025-02", count: 0, label: "Feb 2025" },
    { month: "2025-03", count: 0, label: "Mar 2025" },
    { month: "2025-04", count: 4, label: "Apr 2025" },
    { month: "2025-05", count: 3, label: "May 2025" },
    { month: "2025-06", count: 0, label: "Jun 2025" },
    { month: "2025-07", count: 7, label: "Jul 2025" },
    { month: "2025-08", count: 0, label: "Aug 2025" },
    { month: "2025-09", count: 1, label: "Sep 2025" },
    { month: "2025-10", count: 0, label: "Oct 2025" },
    { month: "2025-11", count: 3, label: "Nov 2025" },
    { month: "2025-12", count: 9, label: "Dec 2025" },
    { month: "2026-01", count: 2, label: "Jan 2026" },
    { month: "2026-02", count: 0, label: "Feb 2026" }
];

// Detailed appearance data
const appearances = [
    {
        date: "2025-01-15",
        county: "Thurston",
        town: "Olympia",
        location: "Washington State Capitol - House of Representatives Chamber",
        description: "Inauguration ceremony and inaugural address covering housing reform, police hiring, reproductive freedom, free school meals, and government reform"
    },
    {
        date: "2025-01-15",
        county: "Thurston",
        town: "Olympia",
        location: "Washington State Capitol",
        description: "Signed three executive orders on housing regulations review, reproductive freedom protections, and permitting reform"
    },
    {
        date: "2025-04-01",
        county: "Thurston",
        town: "Olympia",
        location: "Washington State Capitol",
        description: "Press conference to provide update on state's operating budget"
    },
    {
        date: "2025-04-09",
        county: "Pierce",
        town: "Tacoma",
        location: "Islamic Center of Tacoma",
        description: "Bill signing for recognizing Eid al-Fitr and Eid al-Adha as state holidays - first state to do so"
    },
    {
        date: "2025-04-21",
        county: "Thurston",
        town: "Olympia",
        location: "Washington State Capitol",
        description: "Signed HB 1321 restricting out-of-state military forces from entering Washington without Governor's permission"
    },
    {
        date: "2025-04-28",
        county: "Pierce",
        town: "DuPont",
        location: "Western Washington Sheet Metal Joint Apprenticeship Training Committee campus",
        description: "Bill signing on International Workers' Memorial Day strengthening youth labor law protections"
    },
    {
        date: "2025-05-02",
        county: "Thurston",
        town: "Olympia",
        location: "Washington State Capitol",
        description: "Bill signing ceremony for multiple bills"
    },
    {
        date: "2025-05-07",
        county: "King",
        town: "Seattle",
        location: "Blake House affordable housing high rise downtown",
        description: "Bill signing for rent stabilization and affordable housing bills including HB 1217"
    },
    {
        date: "2025-05-16",
        county: "Benton",
        town: "Kennewick",
        location: "Tri-City Development Council",
        description: "Bill signing event for Climate Commitment Act farmer fuel exemption and 10 other bills"
    },
    {
        date: "2025-07-09",
        county: "King",
        town: "Seattle",
        location: "Seattle",
        description: "Announced Washington state will cover gap caused by federal defunding of Planned Parenthood"
    },
    {
        date: "2025-07-14",
        county: "San Juan",
        town: "Orcas Island",
        location: "Orcas Center",
        description: "Public meeting on Washington State Ferries system with ferry officials and county council members"
    },
    {
        date: "2025-07-23",
        county: "Clark",
        town: "Vancouver",
        location: "Hilton Vancouver Convention Center",
        description: "Speech at Washington State Labor Council convention, discussed worker wins from 2025 legislative session"
    },
    {
        date: "2025-07-23",
        county: "Grays Harbor",
        town: "Taholah",
        location: "Quinault Indian Nation",
        description: "Attended opening of new Quinault Indian Nation building funded by Climate Commitment Act"
    },
    {
        date: "2025-07-23",
        county: "Clallam",
        town: "La Push area",
        location: "Quileute Tribal Council",
        description: "Meeting with Quileute Tribal Council"
    },
    {
        date: "2025-09-09",
        county: "Chelan",
        town: "Wenatchee",
        location: "Washington Building and Construction Trades Council convention",
        description: "Signed executive order requiring Project Labor Agreements for workers on state-funded projects over $35 million"
    },
    {
        date: "2025-11-04",
        county: "Pierce",
        town: "Lakewood",
        location: "Western State Hospital",
        description: "Week-long working visit at Western State Hospital meeting with staff, patients, and touring facilities"
    },
    {
        date: "2025-11-07",
        county: "Pierce",
        town: "Lakewood",
        location: "Western State Hospital",
        description: "Concluded week at Western State Hospital with press conference on behavioral health system"
    },
    {
        date: "2025-11-07",
        county: "Pierce",
        town: "Pierce County",
        location: "Pierce County",
        description: "Roundtable discussion with behavioral health leaders and elected officials"
    },
    {
        date: "2025-12-12",
        county: "King",
        town: "Tukwila",
        location: "Office location",
        description: "Press conference about state's flood response with emergency officials"
    },
    {
        date: "2025-12-16",
        county: "King",
        town: "Seattle",
        location: "King County office building",
        description: "Press conference on flooding emergency with FEMA officials announcing $3.5M immediate assistance"
    },
    {
        date: "2025-12-17",
        county: "Whatcom",
        town: "Sumas",
        location: "Sumas City Hall",
        description: "Flood damage tour and meeting with community members after historic flooding"
    },
    {
        date: "2025-12-17",
        county: "Whatcom",
        town: "Everson",
        location: "Downtown Everson and City Hall",
        description: "Flood damage tour with Mayor John Perry viewing impacted areas"
    },
    {
        date: "2025-12-17",
        county: "Whatcom",
        town: "Nooksack",
        location: "Nooksack areas",
        description: "Flood damage tour of Nooksack areas impacted by Nooksack River flooding"
    },
    {
        date: "2025-12-17",
        county: "Whatcom",
        town: "Bellingham",
        location: "Whatcom Unified Emergency Coordination Center",
        description: "Press conference on flooding response with local and state officials"
    },
    {
        date: "2025-12-18",
        county: "King",
        town: "Seattle",
        location: "Beacon Pacific Village",
        description: "Announced $244M housing investment and signed executive order to establish housing task force"
    },
    {
        date: "2025-12-19",
        county: "Thurston",
        town: "Lacey",
        location: "Washington State Department of Transportation facility",
        description: "Announced supplemental transportation budget and Preserve Washington Fund with $3B investment"
    },
    {
        date: "2025-12-23",
        county: "Thurston",
        town: "Olympia",
        location: "Washington State Capitol",
        description: "Press conference unveiling supplemental budget proposals"
    },
    {
        date: "2026-01-13",
        county: "Thurston",
        town: "Olympia",
        location: "Washington State Capitol - House Chamber",
        description: "First State of the State address covering December 2025 flooding response, infrastructure investment, millionaires' tax proposal"
    },
    {
        date: "2026-01-26",
        county: "Thurston",
        town: "Olympia",
        location: "Olympia",
        description: "Press conference with Attorney General Nick Brown denouncing ICE operations in Minnesota"
    },
    {
        date: "2025-07-23",
        county: "Clark",
        town: "Vancouver",
        location: "Hilton Vancouver Convention Center",
        description: "Meetings with union officials representing machinists, Teamsters, and electrical workers"
    },
    {
        date: "2025-07-23",
        county: "Grays Harbor",
        town: "Taholah",
        location: "Quinault Tribal Council",
        description: "Meeting with Quinault Tribal Council"
    }
];
