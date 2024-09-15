import React from 'react';

// Define the data structure for the topics
interface TopicData {
  topic: string;
  topic_count: number;
}

// Define the props for the TableTopics component
interface TableTopicsProps {
  topics: TopicData[];
}

const TableTopics: React.FC<TableTopicsProps> = ({ topics }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Topics Overview
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
          <div className="p-2.5 xl:p-5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Topic
            </h5>
          </div>
          
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Occurrences
            </h5>
          </div>
        </div>

        {topics.map((topic, key) => (
          <div
            className={`grid grid-cols-2 sm:grid-cols-2 ${
              key === topics.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black text-center dark:text-white">
                {topic.topic}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{topic.topic_count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableTopics;
