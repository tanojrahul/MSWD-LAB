import React, { useState } from 'react';

const JobsCatalog = () => {
  const [jobs] = useState([
    { id: 1, title: 'React Developer', company: 'Tech Corp', salary: '$80k-$100k', location: 'Remote', type: 'Full-time' },
    { id: 2, title: 'Senior JavaScript Dev', company: 'Web Solutions', salary: '$100k-$120k', location: 'NYC', type: 'Full-time' },
    { id: 3, title: 'Node.js Developer', company: 'Cloud Systems', salary: '$75k-$95k', location: 'San Francisco', type: 'Full-time' },
    { id: 4, title: 'Frontend Engineer', company: 'Design Studio', salary: '$70k-$90k', location: 'Boston', type: 'Contract' },
    { id: 5, title: 'Full Stack Developer', company: 'StartUp Hub', salary: '$85k-$110k', location: 'Remote', type: 'Full-time' },
    { id: 6, title: 'UI/UX Developer', company: 'Creative Agency', salary: '$65k-$85k', location: 'Los Angeles', type: 'Part-time' },
  ]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [filters, setFilters] = useState({ location: '', type: '' });
  const [sortBy, setSortBy] = useState('title');

  const handleFilter = () => {
    let filtered = jobs;

    if (filters.location) {
      filtered = filtered.filter(job => job.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    if (filters.type) {
      filtered = filtered.filter(job => job.type === filters.type);
    }

    // Sort
    if (sortBy === 'salary') {
      filtered = filtered.sort((a, b) => parseInt(b.salary) - parseInt(a.salary));
    } else if (sortBy === 'title') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredJobs(filtered);
  };

  React.useEffect(() => {
    handleFilter();
  }, [filters, sortBy]);

  return (
    <div className="container-fluid" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <h1 className="mb-4">Jobs Catalog</h1>

      {/* Filter and Sort Section */}
      <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Sort by Title</option>
            <option value="salary">Sort by Salary</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100">
            Search Jobs ({filteredJobs.length})
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="row">
        {filteredJobs.map(job => (
          <div className="col-md-6 col-lg-4 mb-4" key={job.id}>
            <div className="card h-100 shadow-sm" style={{ borderLeft: '4px solid #007bff' }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#007bff' }}>{job.title}</h5>
                <p className="card-text text-muted">{job.company}</p>

                <div className="mb-3">
                  <span className="badge badge-primary mr-2">{job.type}</span>
                  <span className="badge badge-secondary">{job.location}</span>
                </div>

                <p className="card-text" style={{ fontSize: '16px', fontWeight: 'bold', color: '#28a745' }}>
                  {job.salary}
                </p>

                <button className="btn btn-outline-primary btn-block">Apply Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="alert alert-info" role="alert">
          No jobs found matching your criteria. Try adjusting your filters!
        </div>
      )}
    </div>
  );
};

export default JobsCatalog;
