const { TeamModel } = require('../model/teams');
const { UserModel } = require('../model/user');
const { ApiKeyModel } = require('../model/apiKey');
const { LeaderboardModel } = require('../model/leaderboard');

async function addTeam(team) {
	try {
		return await TeamModel.create(team);
	} catch (error) {
		console.log(`erroror: ${error}`);
		throw error;
	}
}

async function getTeams(clientId) {
	try {
		return await TeamModel.find({ clientId }).exec()
	} catch (error) {
		console.log(error)
	}
}

async function getTeam(teamId) {
	try {
		return await TeamModel.findById(teamId).exec();
	} catch (error) {
		console.log('Error getting team')
		console.log(error)
	}
}

async function getTeamByName(teamName) {
	try {
		return await TeamModel.find({ teamName }).exec();
	} catch (error) {
		console.log('Error getting team')
		console.log(error)
	}
}
async function getTeamsById(teamIdArray) {
	try {
		return await TeamModel.find().where('_id').in(teamIdArray).exec();
	} catch (error) {
		console.log('Error getting team')
		console.log(error)
	}
}

async function deleteTeamById(id) {
	try {
		return await TeamModel.findByIdAndDelete(id);
	} catch (error) {
		console.trace(error);
	}
}

async function updateTeamById(id, team) {
	try {
		return await TeamModel.findByIdAndUpdate(id, team);
	} catch (error) {
		console.trace(error);
	}
}

async function updateTeamScoresById(teams) {
	try {
		const promises = [];
		teams.forEach(team => {
			const promise = TeamModel.updateOne(
				{ _id: team._id },
				{ $set: { score: team.score } },
			);
			promises.push(promise);
		});
		return await Promise.all(promises);
	} catch (error) {
		console.trace(error);
	}
}

async function addUser(user) {
	try {
		return await UserModel.create(user)
	} catch (error) {
		console.log('\nERROR CREATING USER\n')
		console.log('addUser -> error', error)
		throw error
	}
}

async function findUserByEmail(email) {
	try {
		return await UserModel.find({ email }).exec()
	} catch (error) {
		console.log('findUserByEmail -> error', error)
	}
}

async function addApiKey(apiKey) {
	try {
		return await ApiKeyModel.create(apiKey)
	} catch (error) {
		console.log('Error creating API Key')
		throw error
	}
}

async function findApiKeyHashBySalt(salt) {
	try {
		return await ApiKeyModel.find({ salt })
	} catch (error) {
		console.log('findApiKeyHashBySalt -> error', error)
	}
}

async function findApiKeyByTeamId(teamId) {
	try {
		return await ApiKeyModel.find({ teamId })
	} catch (error) {
		console.log('findApiKeyByTeamId -> error', error)
	}
}

async function findApiKeyByClientId(clientId, apiKey) {
	try {
		return await ApiKeyModel.find({ clientId, apiKey })
	} catch (error) {
		console.log('🚀 ~ file: utils.js ~ line 79 ~ findApiKeyByUserId ~ error', error)
		console.log('/n Error findApiKeyByUserId')
	}
}

function createClientSecret(length) {
	return generateSalt(length)
}

async function createLeaderboard(leaderboard) {
	try {
		return await LeaderboardModel.create(leaderboard);
	} catch (error) {
		console.trace(error);
	}
}

module.exports = {
	addTeam,
	getTeams,
	getTeam,
	getTeamByName,
	deleteTeamById,
	updateTeamById,
	updateTeamScoresById,
	getTeamsById,
	addUser,
	addApiKey,
	findUserByEmail,
	findApiKeyHashBySalt,
	findApiKeyByTeamId,
	findApiKeyByClientId,
	createClientSecret,
	createLeaderboard,
}
