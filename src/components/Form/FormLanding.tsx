"use client";

import { useEffect, useState } from "react";
import ModalSuccess from "../ModalSuccess";
import { countriesWithCodes } from "../Option/option";
import Loading from "../Loading";

interface IModalForm {
  desc?: boolean;
}
export default function FormLanding({ desc = true }: IModalForm) {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+");
  const [selectedCountry, setSelectedCountry] = useState("");
  const API =
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfL-eStPwsu4o1N-tVCU6WTsYIbXQMxXzQoxARleFLXC1pFaQ/formResponse";

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const countryName = e.target.value;
      setSelectedCountry(countryName);
    
      const countryCode =
        countriesWithCodes.find((country) => country.name === countryName)?.code ||
        "";
    
      setSelectedCountryCode(countryCode);
      setPhoneNumber("");
    };
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
    
      if (/^\d*$/.test(value)) {
        setPhoneNumber(value);
      }
    };
    

  useEffect(() => {
    if (success) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    // formData.append("entry.1222948073", selectedCountry);

    const fullPhoneNumber = selectedCountryCode + phoneNumber;
    formData.set("entry.252621838", fullPhoneNumber);

    try {
      await fetch(API, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setSuccess(true);
      setPhoneNumber("");
      setSelectedCountry("");
      setSelectedCountryCode("+");
      document.querySelectorAll("input, select, textarea").forEach((el) => {
        (
          el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        ).value = "";
      });
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim data.");
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="space-y-4"
        action={API}
        method="post"
        // target="hidden_iframe"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="mt-1 p-3 w-full border rounded-xl"
              name="entry.469472773"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              className="mt-1 p-3 w-full border rounded-xl"
              name="entry.898657370"
              required
            />
          </div>
          <div className="md:my-auto">
            <select
              className="mt-1 p-3 w-full border rounded-xl"
              defaultValue=""
              name="entry.933909443"
              required
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="w-full">
            <input
              type="date"
              placeholder="Date of Birth"
              onFocus={(e) => {
                e.target.showPicker();
                e.target.type = "date";
              }}
              className="p-3 w-full border rounded-xl"
              name="entry.404479322"
              required
            />
          </div>
        </div>

        <select
          className="mt-1 p-3 w-full border rounded-xl"
          name="entry.1222948073"
          value={selectedCountry}
          required
          onChange={handleCountryChange}
        >
          <option value="" disabled>
            Nationality
          </option>
          {countriesWithCodes.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="text"
            className="mt-1 p-3 w-20 border rounded-xl bg-gray-200 text-gray-600"
            value={selectedCountryCode}
            disabled
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="mt-1 p-3 w-3/4 border rounded-xl"
            name="entry.252621838"
            value={phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            className="mt-1 p-3 w-full border rounded-xl"
            name="entry.74264763"
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Comment"
            className="mt-1 p-2 w-full border rounded-md"
            rows={6}
            name="entry.436310651"
            required
          ></textarea>
        </div>
        {desc === true ? (
          <p>
            By clicking on <b className="text-[var(--primary)]">Send</b> you
            agree that your data may be used by Indoexpat Insurance to contact
            you by phone or email regarding your insurance application. Find
            more information on the processing of your data in our Personal Data
            Policy.
          </p>
        ) : (
          ""
        )}
        <button
          type="submit"
          value="submit"
          className="btn-primary text-white w-full flex justify-center font-semibold"
        >
          {isLoading === true ? (
            <div className="my-2">
              <Loading />
            </div>
          ) : (
            "Send"
          )}
        </button>
      </form>
      {success && <ModalSuccess setSuccess={setSuccess} />}
    </>
  );
}
