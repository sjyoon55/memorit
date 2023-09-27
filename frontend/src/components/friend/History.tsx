'use client';

import { useEffect, useState } from 'react';
import HistoryModal from './HistoryModal';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { get } from '@/service/api/http';
import { history } from '@/model/history';

type Props = {
  friendId: string | null;
  setTotalCount?: Function;
  setTotalPeople?: Function;
};

export default function History({
  friendId = null,
  setTotalCount,
  setTotalPeople,
}: Props) {
  const [isModal, setIsModal] = useState(false);
  const [articleId, setArticleId] = useState<number>(0);
  const { ref, inView } = useInView();

  const getHistoryList = async (query = {}, page = 1) => {
    const res: any = await get('/history/all', query);

    if (friendId == null && setTotalCount && setTotalPeople) {
      setTotalCount(res.list.length);
      const set = new Set();
      res.list.map((el: any) => set.add(el.friendId));

      setTotalPeople(set.size);
    }

    return {
      data: res.list,
      nextPage: page + 1 < res.totalPages ? page + 1 : null,
    };
  };

  const {
    data: historyData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['historyList', friendId],
    queryFn: ({ pageParam = 1 }) =>
      getHistoryList(
        {
          friendId: friendId,
          dataSize: 10,
          pageNumber: pageParam,
          given: null,
        },
        pageParam,
      ),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <>
      <div className="bg-slate-200 grow rounded-t-xl p-6 snap-start">
        <div className="flex justify-between pb-2">
          <div className="relative">
            <p className="text-lg font-bold">히스토리</p>
            <div className="absolute w-[66px] h-2 bg-blue-400 opacity-70 bottom-[0.15rem] " />
          </div>
          <p>받은 기억</p>
        </div>

        <div>
          {historyData?.pages.map((group, i) => (
            <div key={i}>
              {group?.data?.map((el: history, index: number) => (
                <div
                  key={el.articleId}
                  onClick={() => {
                    setArticleId(el.articleId);
                    setIsModal((prev) => !prev);
                  }}
                  className={`flex flex-col ${
                    el.given ? 'items-start' : 'items-end'
                  } my-1`}
                >
                  <div
                    className={`flex flex-col border-2 shadow-md w-64 ${
                      el.given ? 'bg-white' : 'bg-yellow-300'
                    } rounded-xl text-sm font-bold p-3`}
                  >
                    <p>{el.type}</p>
                    <p>{`${el.amount}원`}</p>
                  </div>
                  <p className="text-xs font-medium ml-3 mt-">{el.date}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {/* {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'} */}
          </button>
        </div>
        <div className="flex justify-center text-sm font-semibold leading-6 text-gray-900">
          {/* {isFetching && !isFetchingNextPage ? 'Background Updating...' : null} */}
        </div>
      </div>
      <HistoryModal
        isModal={isModal}
        setIsModal={setIsModal}
        articleId={articleId}
      />
    </>
  );
}
