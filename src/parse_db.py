import argparse
import csv
import json
from typing import List


def get_video(row: List[str], duration_mn_min=5, duratin_mn_max=25, min_views=1e6, min_like_percent=90):
    views = int(row[8])
    if views < min_views:
        return None

    duration_s = int(row[7])
    if not ((60*duration_mn_min) <= duration_s <= (60 * duratin_mn_max)):
        return None

    likes = int(row[9]) if row[9] else 0
    dislikes = int(row[10]) if row[10] else 0
    like_percent = int(100*likes / max(1, likes + dislikes))
    if like_percent < min_like_percent:
        return None

    id = row[0].split("/embed/", 2)[1].split("\"", 1)[0]
    thumbnail_lq = row[1]
    title = row[3]
    tags = [s.strip().lower() for s in row[4].split(";")]
    categories = [s.strip().lower() for s in row[5].split(";")]
    pornstar = row[6]
    thumbnail_hq = row[11]
    thumbnail_nb = len(row[12].split(";"))  # same as len(row[2].split(";"))

    # /videos/201809/26/184836121/
    date_list = thumbnail_hq.split("videos/")[1].split("/")
    date = f"{date_list[0][:4]}-{date_list[0][4:]}-{date_list[1]}"

    return {
        "id": id,
        "title": title,
        "pornstar": pornstar,

        "tags": tags,
        "categories": categories,

        "thumbnail_lq": thumbnail_lq,
        "thumbnail_hq": thumbnail_hq,
        "thumbnail_nb": thumbnail_nb,

        "date": date,
        "views": views,
        "duration_s": duration_s,
        "likes": likes,
        "dislikes": dislikes,
        "like_percent": like_percent
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("database")

    args = parser.parse_args()

    videos = []
    with open(args.database, "r") as file:
        i = 0
        while True:
            line = file.readline()
            if not line:
                break

            try:
                video = get_video(line.split("|"))
                if video is not None:
                    videos.append(video)
                i += 1
                if i % 10000 == 0:
                    print(f"\r{i}/5063510 {len(videos)}", end="")
            except Exception as e:
                print(f"\nerror: {e}")

        print()

    output_file = "dump.json"
    with open(output_file, "w") as file:
        json.dump({"videos": videos}, file, indent=True)
        file.write("\n")

"""
- [0] <iframe src="https://www.pornhub.com/embed/f4cc0ad3819a36752467" frameborder="0" height="481" width="608" scrolling="no"></iframe>
- [1] https://ei.phncdn.com/videos/200708/12/347/original/(m=eaf8GgaaaWavb)(mh=tDd4ubbYfE8zo0qI)7.jpg
- [2] https://ei.phncdn.com/videos/200708/12/347/original/(m=eaf8GgaaaWavb)(mh=tDd4ubbYfE8zo0qI)1.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaf8GgaaaWavb)(mh=tDd4ubbYfE8zo0qI)2.jpg ...
- [3] Heather brooke swallo from condom
- [4] ideepthroat.com;pornstar;swallow;blowjob;fetish;cum;big-tits;fake-tits
- [5] Blowjob;Pornstar;Verified Models
- [6] Heather Harmon
- [7] 99
- [8] 2662149
- [9] 3182
- [10] 479
- [11] https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)7.jpg
- [12] https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)1.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)2.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)3.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)4.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)5.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)6.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)7.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)8.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)9.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)10.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)11.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)12.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)13.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)14.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)15.jpg;https://ei.phncdn.com/videos/200708/12/347/original/(m=eaAaGwObaaamqv)(mh=e6robHLm4BSQm1Qm)16.jpg
"""
