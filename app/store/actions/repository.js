/**
 * Created by mai on 2017/11/15.
 */

import {REPOSITORY} from '../type'
import RepositoryDao from '../../dao/repositoryDao'
import {Buffer} from 'buffer'
import {generateMd2Html} from "../../utils/htmlUtils";
import realm from "../../dao/db";
import * as Config from "../../config";

const getTrend = (page = 0, since = 'daily', languageType, callback) => async (dispatch, getState) => {
    let resLocal = await RepositoryDao.getTrendDao(page, since, languageType, true);
    if (resLocal && resLocal.result && resLocal.data.length > 0) {
        dispatch({
            type: REPOSITORY.TREND_REPOSITORY,
            res: resLocal.data
        });
    }
    let res = await resLocal.next();
    if (res && res.result) {
        dispatch({
            type: REPOSITORY.TREND_REPOSITORY,
            res: res.data
        });
        callback && callback(res.data);
    } else {
        callback && callback(null);
    }
};


const getPulse = async (owner, repositoryName) => {
    let resLocal = await RepositoryDao.getPulseDao(owner, repositoryName);
    return resLocal;
};

const searchRepository = async (q, language, sort, order, type, page = 1, pageSize) => {
    if (language) {
        q = q + `%2Blanguage%3A${language}`;
    }
    let res = await RepositoryDao.searchRepositoryDao(q, sort, order, type, page, pageSize);
    return {
        result: res.result,
        data: res.data
    }
};

const searchRepositoryIssue = async (q, name, reposName, page = 1, state) => {
    let qu;
    if (!state || state === 'all') {
        qu = q + `+repo%3A${name}%2F${reposName}`;
    } else {
        qu = q + `+repo%3A${name}%2F${reposName}+state%3A${state}`;
    }

    let res = await RepositoryDao.searchRepositoryIssueDao(qu, page);
    return {
        result: res.result,
        data: res.data
    }
};

const getUserRepository = async (userName, page = 1, sort) => {
    if (page <= 1) {
        return RepositoryDao.getUserRepositoryDao(userName, page, sort, true);
    } else {
        return RepositoryDao.getUserRepositoryDao(userName, page, sort)
    }
};

/**
 * 用户收藏的
 */
const getStarRepository = async (userName, page = 1, sort) => {
    if (page <= 1) {
        return RepositoryDao.getStarRepositoryDao(userName, page, sort, true);
    } else {
        return RepositoryDao.getStarRepositoryDao(userName, page, sort)
    }
};

const getRepositoryDetail = async (userName, reposName) => {
    return RepositoryDao.getRepositoryDetailDao(userName, reposName);
};

const getRepositoryForks = async (userName, reposName, page = 1) => {
    if (page <= 1) {
        return RepositoryDao.getRepositoryForksDao(userName, reposName, page, true);
    } else {
        return RepositoryDao.getRepositoryForksDao(userName, reposName, page);
    }
};

const createRepositoryForks = async (userName, reposName) => {
    let res = await RepositoryDao.createForkDao(userName, reposName);
    return {
        data: res.data,
        result: res.result
    };
};

const getBranches = async (userName, reposName) => {
    return RepositoryDao.getBranchesDao(userName, reposName);
};

const getRepositoryStar = async (userName, reposName, page = 1) => {
    if (page <= 1) {
        return RepositoryDao.getRepositoryStarDao(userName, reposName, page, true);
    } else {
        return RepositoryDao.getRepositoryStarDao(userName, reposName, page);
    }
};

const getRepositoryWatcher = async (userName, reposName, page = 1) => {
    if (page <= 1) {
        return RepositoryDao.getRepositoryWatcherDao(userName, reposName, page, true);
    } else {
        return RepositoryDao.getRepositoryWatcherDao(userName, reposName, page);
    }
};

const getRepositoryStatus = async (userName, reposName) => {
    let res = await RepositoryDao.getRepositoryStatusDao(userName, reposName);
    return {
        data: res.data,
        result: res.result
    };
};

const doRepositoryStar = async (userName, reposName, star) => {
    let res = await RepositoryDao.doRepositoryStarDao(userName, reposName, star);
    return {
        data: res.data,
        result: res.result
    };
};

const doRepositoryWatch = async (userName, reposName, watch) => {
    let res = await RepositoryDao.doRepositoryWatchDao(userName, reposName, watch);
    return {
        data: res.data,
        result: res.result
    };
};

const getRepositoryRelease = async (userName, reposName, page = 1, needHtml = true) => {
    let res = await RepositoryDao.getRepositoryReleaseDao(userName, reposName, page, needHtml);
    return {
        data: res.data,
        result: res.result
    };
};

const getRepositoryTag = async (userName, reposName, page = 1) => {
    let res = await RepositoryDao.getRepositoryTagDao(userName, reposName, page);
    return {
        data: res.data,
        result: res.result
    };
};

const getReposCommits = async (page = 0, userName, reposName) => {
    if (page <= 1) {
        return RepositoryDao.getReposCommitsDao(userName, reposName, page, true);
    } else {
        return RepositoryDao.getReposCommitsDao(userName, reposName, page);
    }
};

const getReposCommitsInfo = async (userName, reposName, sha) => {
    return RepositoryDao.getReposCommitsInfoDao(userName, reposName, sha);
};


const getRepositoryDetailReadme = async (userName, reposName, branch) => {
    let res = await RepositoryDao.getRepositoryDetailReadmeDao(userName, reposName, branch);
    if (res.result) {
        let b = Buffer(res.data.content, 'base64');
        let data = b.toString('utf8');
        return {
            result: true,
            data: generateMd2Html(data, userName, reposName, branch)
        }
    } else {
        return {
            result: false,
            data: ""
        }
    }
};

const getRepositoryDetailReadmeHtml = async (userName, reposName, branch) => {
    let res = RepositoryDao.getRepositoryDetailReadmeHtmlDao(userName, reposName, branch);
    if (res.result) {
        return {
            result: true,
            data: res.data,
            next: res.next
        }
    } else {
        return {
            result: false,
            data: "",
            next: res.next
        }
    }
};

const getReposFileDir = async (userName, reposName, path, branch, text) => {
    let res = await RepositoryDao.getReposFileDirDao(userName, reposName, path, branch, text);
    return {
        data: res.data,
        result: res.result
    };
};

const addRepositoryLocalRead = async (userName, reposName, data) => {
    RepositoryDao.addRepositoryLocalReadDao(userName, reposName, data);
};
const getRepositoryLocalRead = async (page = 1) => {
    let res = RepositoryDao.getRepositoryLocalReadDao(page);
    return {
        result: true,
        data: res.data,
    }
};

const searchTopicRepository = async (searchTopic, page = 0) => {
    let res = await RepositoryDao.searchTopicRepositoryDao(searchTopic, page);
    return {
        data: res.data,
        result: res.result
    }
};
const getUserRepository100Status = async (userName) => {
    let res = await RepositoryDao.getUserRepository100StatusDao(userName);
    return {
        data: res.data,
        result: res.result
    }
};


export default {
    getTrend,
    searchRepository,
    getUserRepository,
    getStarRepository,
    getRepositoryDetail,
    getRepositoryDetailReadme,
    getRepositoryDetailReadmeHtml,
    getRepositoryForks,
    getRepositoryStar,
    getRepositoryWatcher,
    getRepositoryStatus,
    doRepositoryStar,
    doRepositoryWatch,
    getRepositoryRelease,
    getReposCommits,
    getReposCommitsInfo,
    getRepositoryTag,
    getReposFileDir,
    searchRepositoryIssue,
    createRepositoryForks,
    getBranches,
    getRepositoryLocalRead,
    addRepositoryLocalRead,
    searchTopicRepository,
    getUserRepository100Status,
    getPulse

}
