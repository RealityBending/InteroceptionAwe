import json

import numpy as np
import pandas as pd

import requests

# Load useful functions
exec(
    requests.get(
        "https://raw.githubusercontent.com/RealityBending/scripts/main/data_OSF.py"
    ).text
)

# Connect to OSF and get files --------------------------------------------
token = ""  # Paste OSF token here to access private repositories
files = osf_listfiles(  # Function in the data_OSF.py script loaded above
    token=token,
    data_subproject="zy5nw",  # Data subproject ID
    after_date="29/06/2024",
)

# Loop through files ======================================================
# Initialize empty dataframes
alldata = pd.DataFrame()

for i, file in enumerate(files):
    print(f"File N°{i+1}/{len(files)}")  # Print progress

    # Skip if participant already in the dataset
    if (
        "Participant" in alldata.columns
        and file["name"] in alldata["Participant"].values
    ):
        continue

    data = osf_download(file)  # Function in the data_OSF.py script loaded above

    # Participant ----------------------------------------------------------
    data["screen"].unique()

    # Browser info -------------------------------------------------------
    browser = data[data["screen"] == "browser_info"].iloc[0]

    df = pd.DataFrame(
        {
            "Participant": file["name"],
            "Experiment_Duration": data["time_elapsed"].max() / 1000 / 60,
            "Date_OSF": file["date"],
            "Date": browser["date"],
            "Time": browser["time"],
            "Browser": browser["browser"],
            "Mobile": browser["mobile"],
            "Platform": browser["os"],
            "Screen_Width": browser["screen_width"],
            "Screen_Height": browser["screen_height"],
        },
        index=[0],
    )

    # Demographics -------------------------------------------------------
    demo = data[data["screen"] == "demographic_questionnaire"].iloc[0]
    demo = json.loads(demo["response"])

    for item in demo:
        df[item] = demo[item]

    # Stimuli ------------------------------------------------------------
    stim1 = data[data["screen"] == "Stimulus1"].iloc[0]
    df["Condition"] = stim1["condition"]
    df["Video1_Duration"] = stim1["rt"] / 1000 / 60

    stim2 = data[data["screen"] == "Stimulus2"].iloc[0]
    assert stim1["condition"] == stim2["condition"]
    df["Video2_Duration"] = stim2["rt"] / 1000 / 60
    df["Video_Order"] = (
        stim1["item"]
        .replace("youtube.com/embed/", "")
        .replace("https://", "")
        .replace("www.", "")
        + " - "
        + stim2["item"]
        .replace("youtube.com/embed/", "")
        .replace("https://", "")
        .replace("www.", "")
    )

    # BHS ----------------------------------------------------------------
    bhs = data[data["screen"] == "bhs_questionnaire"].iloc[0]

    df["BHS_Duration"] = bhs["rt"] / 1000 / 60
    bhs = json.loads(bhs["response"])
    for item in bhs:
        df[item] = bhs[item]

    # RRS ----------------------------------------------------------------
    rrs = data[data["screen"] == "rrs-questionnaire_long"].iloc[0]

    df["RRS_Duration"] = rrs["rt"] / 1000 / 60
    rrs = json.loads(rrs["response"])
    for item in rrs:
        answ = (
            rrs[item]
            .replace(")", "")
            .replace("Almost never (", "")
            .replace("Sometimes (", "")
            .replace("Often (", "")
            .replace("Almost always (", "")
        )

        df[item] = float(answ)

    # Defragment
    df = df.copy()

    # IAS ----------------------------------------------------------------
    ias = data[data["screen"] == "ias_questionnaire"].iloc[0]

    df["IAS_Duration"] = ias["rt"] / 1000 / 60
    ias = json.loads(ias["response"])
    for item in ias:
        df[item] = ias[item]

    # RRS 2 --------------------------------------------------------------
    rrs2 = data[data["screen"] == "rrs_questionnaire_short"].iloc[0]

    df["RRS2_Duration"] = rrs2["rt"] / 1000 / 60
    rrs2 = json.loads(rrs2["response"])
    for item in rrs2:
        answ = (
            rrs2[item]
            .replace(")", "")
            .replace("Almost never (", "")
            .replace("Often (", "")
            .replace("Sometimes (", "")
            .replace("Almost always (", "")
        )
        df[item] = float(answ)

    # Awe ----------------------------------------------------------------
    awe = data[data["screen"] == "awe_experience_questionnaire"].iloc[0]

    df["Awe_Duration"] = awe["rt"] / 1000 / 60
    awe = json.loads(awe["response"])
    for item in awe:
        answ = (
            awe[item]
            .replace(")", "")
            .replace("Strongly Disagree (", "")
            .replace("Moderately Disagree (", "")
            .replace("Somewhat Disagree (", "")
            .replace("Neutral (", "")
            .replace("Somewhat Agree (", "")
            .replace("Moderately Agree (", "")
            .replace("Strongly Agree (", "")
        )
        df[item] = float(answ)

    # STS --------------------------------------------------------------
    sts = data[data["screen"] == "sts_questionnaire"].iloc[0]

    df["STS_Duration"] = sts["rt"] / 1000 / 60
    sts = json.loads(sts["response"])
    for item in sts:
        answ = (
            sts[item]
            .replace("=Very much", "")
            .replace("=Somewhat", "")
            .replace("=Very little", "")
            .replace("=Not at all", "")
        )
        df[item] = float(answ)

    # Concatenate data ------------------------------------------------------
    alldata = pd.concat([alldata, df], axis=0, ignore_index=True)


# Save data ==============================================================

alldata.to_csv("../data/rawdata.csv", index=False)
print("Done!")
