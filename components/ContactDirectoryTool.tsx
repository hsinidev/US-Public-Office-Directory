
import React, { useState, useEffect, useMemo } from 'react';
import { publicOffices } from '../data/PublicOffices.ts';
import type { Contact } from '../types.ts';

const ContactCard: React.FC<{ contact: Contact }> = ({ contact }) => (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 border border-slate-700 rounded-lg shadow-lg p-6 flex flex-col transition-all duration-300 hover:border-blue-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-900/20">
        <h3 className="text-xl font-bold text-blue-300">{contact.officeName}</h3>
        <p className="text-sm text-purple-300 font-medium mb-3">{contact.officeType}</p>
        <div className="text-gray-300 space-y-2 flex-grow">
            <p><span className="font-semibold text-gray-400">Location:</span> {contact.county}, {contact.state}</p>
            <p><span className="font-semibold text-gray-400">Address:</span> {contact.address}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-600 flex justify-between items-center">
            <a href={`tel:${contact.phone}`} className="text-blue-400 hover:underline">{contact.phone}</a>
            <a href={contact.website} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors">
                Visit Website
            </a>
        </div>
    </div>
);

const ContactDirectoryTool: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [stateFilter, setStateFilter] = useState('All');
    const [officeTypeFilter, setOfficeTypeFilter] = useState('All');
    const [filteredOffices, setFilteredOffices] = useState<Contact[]>(publicOffices);

    const states = useMemo(() => ['All', ...Array.from(new Set(publicOffices.map(o => o.state))).sort()], []);
    const officeTypes = useMemo(() => ['All', ...Array.from(new Set(publicOffices.map(o => o.officeType))).sort()], []);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const results = publicOffices.filter(office => {
            const matchesSearch = lowercasedSearchTerm === '' ||
                office.officeName.toLowerCase().includes(lowercasedSearchTerm) ||
                office.county.toLowerCase().includes(lowercasedSearchTerm);
            
            const matchesState = stateFilter === 'All' || office.state === stateFilter;
            const matchesOfficeType = officeTypeFilter === 'All' || office.officeType === officeTypeFilter;

            return matchesSearch && matchesState && matchesOfficeType;
        });
        setFilteredOffices(results);
    }, [searchTerm, stateFilter, officeTypeFilter]);

    return (
        <>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
                    US Public Office Directory
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
                    Your centralized, modern resource for finding public office contact information. Search, filter, and connect with civic services effortlessly.
                </p>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="bg-slate-900/70 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 md:p-8 sticky top-4 z-10 shadow-2xl shadow-black/30">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
                        <div className="sm:col-span-2 lg:col-span-2">
                            <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">Search by Office or County</label>
                            <input
                                type="text"
                                id="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="e.g., Los Angeles County Clerk..."
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg shadow-sm py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-shadow"
                            />
                        </div>
                        <div>
                            <label htmlFor="stateFilter" className="block text-sm font-medium text-gray-300 mb-2">State</label>
                            <select
                                id="stateFilter"
                                value={stateFilter}
                                onChange={(e) => setStateFilter(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                            >
                                {states.map(state => <option key={state} value={state}>{state}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="officeTypeFilter" className="block text-sm font-medium text-gray-300 mb-2">Office Type</label>
                            <select
                                id="officeTypeFilter"
                                value={officeTypeFilter}
                                onChange={(e) => setOfficeTypeFilter(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                            >
                                {officeTypes.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div className="sm:col-span-2 lg:col-span-1">
                            <button onClick={() => { setSearchTerm(''); setStateFilter('All'); setOfficeTypeFilter('All'); }} className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors">
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    {filteredOffices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredOffices.map(office => <ContactCard key={office.id} contact={office} />)}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-slate-800/50 rounded-lg">
                            <p className="text-xl text-gray-400">No offices found matching your criteria.</p>
                            <p className="text-gray-500 mt-2">Try adjusting your search or filter settings.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ContactDirectoryTool;