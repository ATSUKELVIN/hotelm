#!/usr/bin/env node
// Seed hotels by POSTing to the running backend API
(async () => {
    const port = process.env.PORT || 5001;
    const base = `http://localhost:${port}`;
    const force = process.argv.includes('--force') || process.env.FORCE === 'true';

    // Use global fetch if available (Node 18+), otherwise dynamically import node-fetch
    const fetchImpl = global.fetch ? global.fetch : (...args) => import('node-fetch').then(m => m.default(...args));

    const hotels = [
        { name: 'The Plaza', address: '768 5th Ave', city: 'New York', country: 'USA', phone: '+1-212-759-3000', email: 'info@theplaza.com', rating: 5, totalRooms: 282, image: '/images/the-plaza.svg' },
        { name: 'Four Seasons Hotel New York', address: '57 E 57th St', city: 'New York', country: 'USA', phone: '+1-212-758-5700', email: 'nyc@fourseasons.com', rating: 5, totalRooms: 368, image: '/images/four-seasons-ny.svg' },
        { name: 'Hilton New York Midtown', address: '1335 6th Ave', city: 'New York', country: 'USA', phone: '+1-212-586-7000', email: 'info@hiltonny.com', rating: 4, totalRooms: 1871, image: '/images/hilton-ny.svg' },
        { name: 'Marriott Marquis New York', address: '1535 Broadway', city: 'New York', country: 'USA', phone: '+1-212-398-1900', email: 'info@marriottmarquis.com', rating: 4, totalRooms: 1929, image: '/images/marriott-ny.svg' },

        // African hotels
        { name: 'The Table Bay', address: 'Quay 6, Victoria & Alfred Waterfront', city: 'Cape Town', country: 'South Africa', phone: '+27-21-407-5000', email: 'info@tablebay.com', rating: 5, totalRooms: 329, image: '/images/ritz-carlton-boston.svg' },
        { name: 'Royal Mansour Marrakech', address: 'Rue Abou Abbas el Sebti', city: 'Marrakech', country: 'Morocco', phone: '+212-524-433-333', email: 'info@royalmansour.com', rating: 5, totalRooms: 53, image: '/images/four-seasons-ny.svg' },
        { name: 'Four Seasons Hotel Cairo at Nile Plaza', address: '1089 Corniche El Nil', city: 'Cairo', country: 'Egypt', phone: '+20-2-2791-0000', email: 'info@fourseasonscairo.com', rating: 5, totalRooms: 365, image: '/images/four-seasons-ny.svg' },
        { name: 'The Palace of the Lost City', address: 'Sun City Resort', city: 'Sun City', country: 'South Africa', phone: '+27-14-557-0000', email: 'info@lostcity.com', rating: 5, totalRooms: 335, image: '/images/ritz-carlton-boston.svg' },
        { name: 'Kempinski Hotel Gold Coast City', address: 'Independence Ave', city: 'Accra', country: 'Ghana', phone: '+233-30-276-0000', email: 'info@kempinski-accra.com', rating: 5, totalRooms: 286, image: '/images/hilton-ny.svg' },
        { name: 'Four Seasons Resort Seychelles', address: 'Anse Bois de Rose', city: 'Baie Lazare', country: 'Seychelles', phone: '+248-432-6000', email: 'info@fourseasons-seychelles.com', rating: 5, totalRooms: 67, image: '/images/four-seasons-ny.svg' },

        // More worldwide examples
        { name: 'Burj Al Arab', address: 'Jumeirah St', city: 'Dubai', country: 'UAE', phone: '+971-4-301-7777', email: 'info@burjalarab.com', rating: 5, totalRooms: 202, image: '/images/the-plaza.svg' },
        { name: 'Taj Mahal Palace', address: 'Apollo Bunder', city: 'Mumbai', country: 'India', phone: '+91-22-6665-3366', email: 'info@tajmahalpalace.com', rating: 5, totalRooms: 285, image: '/images/ritz-carlton-boston.svg' },
        { name: 'Mandarin Oriental, Tokyo', address: '1-1-1 Nihonbashi Muromachi', city: 'Tokyo', country: 'Japan', phone: '+81-3-3270-8800', email: 'info@mandarinoriental.jp', rating: 5, totalRooms: 179, image: '/images/hilton-ny.svg' },
        { name: 'The Langham, London', address: '1C Portland Pl', city: 'London', country: 'UK', phone: '+44-20-7636-1000', email: 'info@langhamuk.com', rating: 5, totalRooms: 380, image: '/images/the-plaza.svg' },
        { name: 'Shangri-La Singapore', address: '22 Orange Grove Rd', city: 'Singapore', country: 'Singapore', phone: '+65-6737-3644', email: 'info@shangrila.com', rating: 5, totalRooms: 682, image: '/images/marriott-ny.svg' }
    ];

    try {
        const res = await fetchImpl(`${base}/api/hotels`);
        if (!res.ok) {
            console.error(`Failed to GET existing hotels: ${res.status} ${res.statusText}`);
            process.exit(1);
        }
        const existing = await res.json();

        if (force) {
            console.log('--force flag detected. Deleting all existing hotels...');
            for (const hotel of existing) {
                const delRes = await fetchImpl(`${base}/api/hotels/${hotel._id}`, { method: 'DELETE' });
                if (!delRes.ok) {
                    console.warn(`Failed to delete ${hotel.name}`);
                }
            }
            console.log('All hotels deleted.');
        }

        const existingNames = new Set(existing.map(h => h.name));

        const toCreate = force ? hotels : hotels.filter(h => !existingNames.has(h.name));
        if (toCreate.length === 0) {
            console.log('No new hotels to add.');
            process.exit(0);
        }

        for (const hotel of toCreate) {
            const r = await fetchImpl(`${base}/api/hotels`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hotel)
            });
            if (!r.ok) {
                const txt = await r.text();
                console.error('Failed to create', hotel.name, r.status, r.statusText, txt);
            } else {
                const created = await r.json();
                console.log('Created:', created.name, created._id);
            }
        }
        console.log('Seeding completed.');
    } catch (err) {
        console.error('Error seeding hotels:', err);
        process.exit(1);
    }
})();
