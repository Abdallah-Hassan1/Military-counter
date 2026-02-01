"use client";
import Time from "@/app/time";
import { useState } from "react";

export default function Home() {
  const [years, setYears] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [finished, setFinished] = useState(false); // after the time is over, change the default value to "true"
  const date = "May 25, 2026";
  const endDate = new Date(date).getTime();

  // Update the count down every 1 second
  setInterval(function () {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = endDate - now;

    //Check if the time is over or not
    if (!finished && distance < 0) {
      setFinished(true);
    }

    distance = distance < 0 ? -distance : distance;

    const milliSecondsOfDay = 86400000;
    // Time calculations for days, hours, minutes and seconds
    setYears(Math.floor(distance / (milliSecondsOfDay * 365)));
    setDays(
      Math.floor(
        (distance % (milliSecondsOfDay * 365)) / (milliSecondsOfDay),
      ),
    );
    setHours(Math.floor((distance % (milliSecondsOfDay)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
  }, 1000);

  let pageStyle =
    "h-screen flex flex-col bg-[url('/download.jpg')] bg-no-repeat bg-cover";
  if (finished)
    pageStyle =
      "h-screen flex flex-col bg-[url('/ministry.png')] bg-no-repeat bg-cover";

  return (
    <div className={pageStyle}>
      <div className="text-center text-white text-4xl font-semibold p-8 font-serif mt-10">
        Ministry of Interior
        <div className="mt-5 font-bold">
          <span className="text-red-700">Red</span>{" "}
          <span className="text-blue-700">Sea</span>{" "}
          <span className="text-gray-300">Security Forces</span>
        </div>
        <div className="mt-10 -mb-50">
          End date:{" "}
          <span className={`${finished ? "text-green-500" : "text-red-500"}`}>
            {date}
          </span>
        </div>
      </div>

      {finished && (
        <div className="text-center text-white text-4xl font-semibold p-8 font-serif mt-40 -mb-60">
          It &apos; s over since
        </div>
      )}
      <div className="flex flex-row flex-wrap items-center justify-center mt-60">
        {finished && <Time number={years} type={"years"} />}
        <Time number={days} type={"days"} />
        <Time number={hours} type={"hours"} />
        <Time number={minutes} type={"minutes"} />
        {!finished && <Time number={seconds} type={"seconds"} />}
      </div>
    </div>
  );
}
