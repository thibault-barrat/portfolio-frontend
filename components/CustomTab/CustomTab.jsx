import PropTypes from 'prop-types';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './CustomTab.module.scss';

export default function CustomTab({ columns }) {
  return (
    <div className={styles.container}>
      <Tabs>
        <TabList className={styles['tab-list']}>
          {columns.map((column) => (
            <Tab
              key={column.id}
              className={styles.tab}
              selectedClassName={styles['tab--selected']}
            >
              {column.title}
            </Tab>
          ))}
        </TabList>
        {columns.map((column) => (
          <TabPanel key={column.id}>
            <div className={styles['tab-panel']}>
              <Markdown remarkPlugins={[remarkGfm]}>{column.description}</Markdown>
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}

CustomTab.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
