import { twMerge } from 'tailwind-merge';

interface ListPaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const ListPagination: React.FC<ListPaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    return (
        <div className="flex justify-center space-x-2 col-span-full">
            <button
                className={twMerge('px-3 py-1', currentPage === 1 && 'opacity-50')}
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    className={twMerge('px-3 py-1', currentPage === index + 1 && 'font-bold')}
                    onClick={() => handleClick(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <button
                className={twMerge('px-3 py-1', currentPage === totalPages && 'opacity-50')}
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default ListPagination;
