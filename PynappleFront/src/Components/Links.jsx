import React, { useState, useEffect } from "react";
import { GetLinks } from "../service/api";
import NavBar from "./NavBar";
import QRCode from "qrcode.react";
import { Search } from "lucide-react";
// import { link } from '../../../backend/routes';

function Links() {
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const getLinks = async () => {
    const uid = localStorage.getItem("uid");
    const data = { data: uid };
    try {
      const response = await GetLinks(data);
      setLinks(response.links);
      // console.log(response.links)
      // console.log(response.links[0].downloadCount)
      setFilteredLinks(response.links); // Initialize filtered links with all links
    } catch (error) {
      console.log("Error while calling the API", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  useEffect(() => {
    // Filter links based on search term whenever it changes
    const filtered = links.filter((link) =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLinks(filtered);
  }, [searchTerm, links]);

  const copyTextToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    });
  };

  // Placeholder for download counts (assuming each link object has a 'downloads' property)
  const renderDownloadCount = (link) => {
    return <div className="text-sm text-gray-600">Downloads: {}</div>;
  };

  return (
    <div className="min-h-screen flex flex-col bg-yellow-300">
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <div className="text-orange-800 m-8 flex flex-col items-center flex-grow">
        <h2 className="text-3xl font-bold mb-8">Your Links</h2>
        {/* Search bar */}
        <div className="relative w-full max-w-md mb-4">
          <input
            type="text"
            placeholder="Search by file name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        </div>
        {loading ? (
          // Loader component
          <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
            <div className="flex animate-pulse space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 rounded bg-gray-200"></div>
                <div className="">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                    <div className="size-10 h-20 w-20 p-12 bg-gray-200"></div>
                    <div className="col-span-1 mb-2 h-2 rounded bg-gray-200"></div>
                  </div>
                  <div className="h-2 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        ) : links.length ? (
          <>
            <div className="grid gap-8 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-7xl">
              {filteredLinks.map((file, index) => (
                <div
                  key={index}
                  className="bg-yellow-200 shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105"
                >
                  <div className="text-xl font-medium text-black mb-2 truncate">
                    {file.name}
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="text-md font-medium text-black break-all">
                    ${import.meta.env.VITE_API_URL}/file/{file._id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={() =>
                        copyTextToClipboard(
                          `${import.meta.env.VITE_API_URL}/file/${file._id}`,
                          index
                        )
                      }
                      className={`px-4 py-2 rounded-full transition duration-300 shadow-lg text-xs ${
                        copiedIndex === index
                          ? "bg-orange-600 text-white animate-tick"
                          : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-800 hover:to-orange-800"
                      }`}
                    >
                      {copiedIndex === index ? "✓ Copied" : "Copy"}
                    </button>
                    <div className="p-2 bg-white rounded-lg">
                      <QRCode
                        value={`${import.meta.env.VITE_API_URL}/file/${file._id}`}
                        size={128}
                      />
                    </div>
                  </div>
                  {/* {renderDownloadCount(index)} */}
                  <div className="text-sm text-gray-600">
                    Downloads: {file.downloadCount}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-black animate-tic">No links </h1>
          </>
        )}
      </div>
    </div>
  );
}

export default Links;
